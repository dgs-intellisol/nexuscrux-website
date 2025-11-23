import { Hono } from "npm:hono";
import { createClient } from "npm:@supabase/supabase-js@2";

const contact = new Hono();

// Initialize Supabase client with service role
const getSupabaseClient = () => {
  return createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );
};

// =====================================================
// DEMO REQUESTS
// =====================================================

// Submit demo request
contact.post("/demo", async (c) => {
  try {
    const body = await c.req.json();
    
    const {
      name,
      email,
      company,
      phone,
      companySize,
      interest,
      preferredDate,
      additionalInfo,
      utmSource,
      utmMedium,
      utmCampaign,
    } = body;

    // Validate required fields
    if (!name || !email || !company) {
      console.error("Validation error: Missing required fields", { name, email, company });
      return c.json({ error: "Missing required fields: name, email, and company are required" }, 400);
    }

    // Get request metadata
    const userAgent = c.req.header("user-agent") || null;
    const referrer = c.req.header("referer") || null;
    const ipAddress = c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || null;

    const supabase = getSupabaseClient();
    
    console.log("Attempting to insert demo request for:", email);

    // Insert into demo_requests table
    const { data, error } = await supabase
      .from("demo_requests")
      .insert({
        status: "new",
        name,
        email,
        company,
        phone: phone || null,
        company_size: companySize || null,
        interest: interest || null,
        preferred_date: preferredDate || null,
        additional_info: additionalInfo || null,
        user_agent: userAgent,
        ip_address: ipAddress,
        referrer: referrer,
        utm_source: utmSource || null,
        utm_medium: utmMedium || null,
        utm_campaign: utmCampaign || null,
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Database error inserting demo request:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      console.error("Error details:", error.details);
      console.error("Error hint:", error.hint);
      
      // Check if table doesn't exist
      if (error.code === '42P01') {
        return c.json(
          {
            error: "Database table 'demo_requests' does not exist. Please create it using the SQL script in /DATABASE-TABLES-SETUP.md",
            details: error.message,
            setupGuide: "See /DATABASE-TABLES-SETUP.md for table creation instructions"
          },
          500
        );
      }
      
      return c.json(
        {
          error: "Failed to submit demo request",
          details: error.message,
          code: error.code,
          hint: error.hint || "Check server logs for more details"
        },
        500
      );
    }

    console.log(`Demo request submitted successfully: ${data.id} by ${email}`);

    return c.json({
      success: true,
      message: "Demo request submitted successfully",
      submissionId: data.id,
      submittedAt: data.created_at,
    });
  } catch (error) {
    console.error("Error submitting demo request:", error);
    return c.json(
      {
        error: "Failed to submit demo request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

// Get all demo requests (admin)
contact.get("/demo", async (c) => {
  try {
    const supabase = getSupabaseClient();
    
    const status = c.req.query("status");
    const limit = parseInt(c.req.query("limit") || "100");
    const offset = parseInt(c.req.query("offset") || "0");

    let query = supabase
      .from("demo_requests")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Database error fetching demo requests:", error);
      return c.json({ error: "Failed to fetch demo requests", details: error.message }, 500);
    }

    return c.json({
      success: true,
      data: data || [],
      count: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Error fetching demo requests:", error);
    return c.json(
      { error: "Failed to fetch demo requests", details: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
});

// Update demo request status
contact.patch("/demo/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const { status, crmId, contactedAt, scheduledDate, demoNotes, salesRep } = body;

    if (!status && !crmId && !contactedAt && !scheduledDate && !demoNotes && !salesRep) {
      return c.json({ error: "No fields to update" }, 400);
    }

    const supabase = getSupabaseClient();
    const updates: any = {};
    
    if (status) {
      const validStatuses = ["new", "contacted", "scheduled", "completed", "converted", "closed"];
      if (!validStatuses.includes(status)) {
        return c.json({ error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` }, 400);
      }
      updates.status = status;
      
      if (status === "contacted" && !contactedAt) {
        updates.contacted_at = new Date().toISOString();
      }
      if (status === "completed" && !updates.demo_completed_at) {
        updates.demo_completed_at = new Date().toISOString();
      }
    }

    if (crmId) {
      updates.crm_id = crmId;
      updates.crm_synced_at = new Date().toISOString();
    }

    if (contactedAt) updates.contacted_at = contactedAt;
    if (scheduledDate) updates.scheduled_date = scheduledDate;
    if (demoNotes) updates.demo_notes = demoNotes;
    if (salesRep) updates.sales_rep = salesRep;

    const { data, error } = await supabase
      .from("demo_requests")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Database error updating demo request:", error);
      return c.json({ error: "Failed to update demo request", details: error.message }, 500);
    }

    console.log(`Demo request updated: ${id}`);
    return c.json({ success: true, message: "Demo request updated successfully", data });
  } catch (error) {
    console.error("Error updating demo request:", error);
    return c.json(
      { error: "Failed to update demo request", details: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
});

// =====================================================
// SANDBOX REQUESTS
// =====================================================

// Submit sandbox request
contact.post("/sandbox", async (c) => {
  try {
    const body = await c.req.json();
    
    const {
      name,
      email,
      company,
      phone,
      jobTitle,
      useCase,
      expectedTimeline,
      numberOfUsers,
      technicalContactEmail,
      technicalContactName,
      utmSource,
      utmMedium,
      utmCampaign,
    } = body;

    // Validate required fields
    if (!name || !email || !company || !useCase) {
      console.error("Validation error: Missing required fields for sandbox", { name, email, company, useCase });
      return c.json({ error: "Missing required fields: name, email, company, and useCase are required" }, 400);
    }

    const userAgent = c.req.header("user-agent") || null;
    const referrer = c.req.header("referer") || null;
    const ipAddress = c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || null;

    const supabase = getSupabaseClient();
    
    console.log("Attempting to insert sandbox request for:", email);

    const { data, error } = await supabase
      .from("sandbox_requests")
      .insert({
        status: "new",
        name,
        email,
        company,
        phone: phone || null,
        job_title: jobTitle || null,
        use_case: useCase,
        expected_timeline: expectedTimeline || null,
        number_of_users: numberOfUsers || null,
        technical_contact_email: technicalContactEmail || null,
        technical_contact_name: technicalContactName || null,
        user_agent: userAgent,
        ip_address: ipAddress,
        referrer: referrer,
        utm_source: utmSource || null,
        utm_medium: utmMedium || null,
        utm_campaign: utmCampaign || null,
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Database error inserting sandbox request:", error);
      console.error("Error code:", error.code);
      
      if (error.code === '42P01') {
        return c.json(
          {
            error: "Database table 'sandbox_requests' does not exist. Please create it using the SQL script in /DATABASE-TABLES-SETUP.md",
            details: error.message,
            setupGuide: "See /DATABASE-TABLES-SETUP.md for table creation instructions"
          },
          500
        );
      }
      
      return c.json(
        {
          error: "Failed to submit sandbox request",
          details: error.message,
          code: error.code,
        },
        500
      );
    }

    console.log(`Sandbox request submitted successfully: ${data.id} by ${email}`);

    return c.json({
      success: true,
      message: "Sandbox request submitted successfully",
      submissionId: data.id,
      submittedAt: data.created_at,
    });
  } catch (error) {
    console.error("Error submitting sandbox request:", error);
    return c.json(
      {
        error: "Failed to submit sandbox request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

// Get all sandbox requests (admin)
contact.get("/sandbox", async (c) => {
  try {
    const supabase = getSupabaseClient();
    
    const status = c.req.query("status");
    const limit = parseInt(c.req.query("limit") || "100");
    const offset = parseInt(c.req.query("offset") || "0");

    let query = supabase
      .from("sandbox_requests")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Database error fetching sandbox requests:", error);
      return c.json({ error: "Failed to fetch sandbox requests", details: error.message }, 500);
    }

    return c.json({
      success: true,
      data: data || [],
      count: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Error fetching sandbox requests:", error);
    return c.json(
      { error: "Failed to fetch sandbox requests", details: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
});

// Update sandbox request
contact.patch("/sandbox/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const { status, crmId, approvedBy, sandboxUrl, expiresAt, internalNotes } = body;

    if (!status && !crmId && !approvedBy && !sandboxUrl && !expiresAt && !internalNotes) {
      return c.json({ error: "No fields to update" }, 400);
    }

    const supabase = getSupabaseClient();
    const updates: any = {};
    
    if (status) {
      const validStatuses = ["new", "reviewing", "approved", "rejected", "provisioned", "active", "expired", "converted", "closed"];
      if (!validStatuses.includes(status)) {
        return c.json({ error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` }, 400);
      }
      updates.status = status;
      
      if (status === "approved" && !approvedBy) {
        updates.approved_at = new Date().toISOString();
      }
      if (status === "provisioned") {
        updates.provisioned_at = new Date().toISOString();
      }
    }

    if (crmId) {
      updates.crm_id = crmId;
      updates.crm_synced_at = new Date().toISOString();
    }

    if (approvedBy) {
      updates.approved_by = approvedBy;
      updates.approved_at = new Date().toISOString();
    }
    if (sandboxUrl) updates.sandbox_url = sandboxUrl;
    if (expiresAt) updates.expires_at = expiresAt;
    if (internalNotes) updates.internal_notes = internalNotes;

    const { data, error } = await supabase
      .from("sandbox_requests")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Database error updating sandbox request:", error);
      return c.json({ error: "Failed to update sandbox request", details: error.message }, 500);
    }

    console.log(`Sandbox request updated: ${id}`);
    return c.json({ success: true, message: "Sandbox request updated successfully", data });
  } catch (error) {
    console.error("Error updating sandbox request:", error);
    return c.json(
      { error: "Failed to update sandbox request", details: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
});

// =====================================================
// PARTNER INQUIRIES
// =====================================================

// Submit partnership inquiry
contact.post("/partner", async (c) => {
  try {
    const body = await c.req.json();
    
    const {
      name,
      email,
      company,
      phone,
      jobTitle,
      companyWebsite,
      partnershipType,
      message,
      revenuePotential,
      geographicFocus,
      existingCustomers,
      utmSource,
      utmMedium,
      utmCampaign,
    } = body;

    // Validate required fields
    if (!name || !email || !company || !partnershipType || !message) {
      console.error("Validation error: Missing required fields for partner inquiry", { name, email, company, partnershipType, message });
      return c.json({ error: "Missing required fields: name, email, company, partnershipType, and message are required" }, 400);
    }

    const userAgent = c.req.header("user-agent") || null;
    const referrer = c.req.header("referer") || null;
    const ipAddress = c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || null;

    const supabase = getSupabaseClient();
    
    console.log("Attempting to insert partner inquiry for:", email);

    const { data, error } = await supabase
      .from("partner_inquiries")
      .insert({
        status: "new",
        name,
        email,
        company,
        phone: phone || null,
        job_title: jobTitle || null,
        company_website: companyWebsite || null,
        partnership_type: partnershipType,
        message: message,
        revenue_potential: revenuePotential || null,
        geographic_focus: geographicFocus || null,
        existing_customers: existingCustomers || null,
        user_agent: userAgent,
        ip_address: ipAddress,
        referrer: referrer,
        utm_source: utmSource || null,
        utm_medium: utmMedium || null,
        utm_campaign: utmCampaign || null,
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Database error inserting partner inquiry:", error);
      console.error("Error code:", error.code);
      
      if (error.code === '42P01') {
        return c.json(
          {
            error: "Database table 'partner_inquiries' does not exist. Please create it using the SQL script in /DATABASE-TABLES-SETUP.md",
            details: error.message,
            setupGuide: "See /DATABASE-TABLES-SETUP.md for table creation instructions"
          },
          500
        );
      }
      
      return c.json(
        {
          error: "Failed to submit partner inquiry",
          details: error.message,
          code: error.code,
        },
        500
      );
    }

    console.log(`Partner inquiry submitted successfully: ${data.id} by ${email}`);

    return c.json({
      success: true,
      message: "Partner inquiry submitted successfully",
      submissionId: data.id,
      submittedAt: data.created_at,
    });
  } catch (error) {
    console.error("Error submitting partner inquiry:", error);
    return c.json(
      {
        error: "Failed to submit partner inquiry",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

// Get all partner inquiries (admin)
contact.get("/partner", async (c) => {
  try {
    const supabase = getSupabaseClient();
    
    const status = c.req.query("status");
    const partnershipType = c.req.query("type");
    const limit = parseInt(c.req.query("limit") || "100");
    const offset = parseInt(c.req.query("offset") || "0");

    let query = supabase
      .from("partner_inquiries")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq("status", status);
    }
    if (partnershipType) {
      query = query.eq("partnership_type", partnershipType);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Database error fetching partner inquiries:", error);
      return c.json({ error: "Failed to fetch partner inquiries", details: error.message }, 500);
    }

    return c.json({
      success: true,
      data: data || [],
      count: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Error fetching partner inquiries:", error);
    return c.json(
      { error: "Failed to fetch partner inquiries", details: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
});

// Update partner inquiry
contact.patch("/partner/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const { status, crmId, assignedTo, qualificationNotes, partnershipTier, agreementDate, agreementValue } = body;

    if (!status && !crmId && !assignedTo && !qualificationNotes && !partnershipTier && !agreementDate && !agreementValue) {
      return c.json({ error: "No fields to update" }, 400);
    }

    const supabase = getSupabaseClient();
    const updates: any = {};
    
    if (status) {
      const validStatuses = ["new", "reviewing", "qualified", "not_qualified", "negotiating", "agreement", "closed"];
      if (!validStatuses.includes(status)) {
        return c.json({ error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` }, 400);
      }
      updates.status = status;
      
      if (status === "qualified") {
        updates.qualified_at = new Date().toISOString();
      }
    }

    if (crmId) {
      updates.crm_id = crmId;
      updates.crm_synced_at = new Date().toISOString();
    }

    if (assignedTo) updates.assigned_to = assignedTo;
    if (qualificationNotes) updates.qualification_notes = qualificationNotes;
    if (partnershipTier) updates.partnership_tier = partnershipTier;
    if (agreementDate) updates.agreement_date = agreementDate;
    if (agreementValue) updates.agreement_value = agreementValue;

    const { data, error } = await supabase
      .from("partner_inquiries")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Database error updating partner inquiry:", error);
      return c.json({ error: "Failed to update partner inquiry", details: error.message }, 500);
    }

    console.log(`Partner inquiry updated: ${id}`);
    return c.json({ success: true, message: "Partner inquiry updated successfully", data });
  } catch (error) {
    console.error("Error updating partner inquiry:", error);
    return c.json(
      { error: "Failed to update partner inquiry", details: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
});

export default contact;
