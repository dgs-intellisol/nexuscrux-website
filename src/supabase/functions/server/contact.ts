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
// DRIVER INTEREST
// =====================================================

// Submit driver interest (quick signup from drivers page)
contact.post("/driver-interest", async (c) => {
  try {
    const body = await c.req.json();
    
    const {
      email,
      source,
      timestamp,
    } = body;

    // Validate required fields
    if (!email) {
      console.error("Validation error: Missing email");
      return c.json({ error: "Email is required" }, 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Validation error: Invalid email format");
      return c.json({ error: "Invalid email format" }, 400);
    }

    // Get request metadata
    const userAgent = c.req.header("user-agent") || null;
    const referrer = c.req.header("referer") || null;
    const ipAddress = c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || null;

    const supabase = getSupabaseClient();
    
    console.log("Attempting to save driver interest for:", email);

    const submittedAt = timestamp || new Date().toISOString();

    // Insert into driver_interest table
    const { data, error } = await supabase
      .from('driver_interest')
      .insert([{
        email,
        source: source || 'drivers_page_hero',
        submitted_at: submittedAt,
        user_agent: userAgent,
        referrer,
        ip_address: ipAddress,
        status: 'new',
      }])
      .select()
      .single();

    if (error) {
      console.error("Database error saving driver interest:", error);
      return c.json({ 
        error: "Failed to save driver interest",
        details: error.message 
      }, 500);
    }

    console.log("✅ Driver interest submitted successfully:", data.id);

    return c.json({ 
      success: true,
      message: "Driver interest submitted successfully",
      id: data.id
    });

  } catch (error) {
    console.error("Error in driver-interest endpoint:", error);
    return c.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, 500);
  }
});

// Get all driver interest submissions (admin use)
contact.get("/driver-interest", async (c) => {
  try {
    const supabase = getSupabaseClient();
    
    // Get query parameters for filtering
    const status = c.req.query("status");
    const limit = parseInt(c.req.query("limit") || "50");
    const offset = parseInt(c.req.query("offset") || "0");

    console.log(`Fetching driver interest submissions (status: ${status || 'all'}, limit: ${limit}, offset: ${offset})`);

    let query = supabase
      .from('driver_interest')
      .select('*', { count: 'exact' })
      .order('submitted_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Database error fetching driver interest:", error);
      return c.json({ 
        error: "Failed to fetch driver interest",
        details: error.message 
      }, 500);
    }

    console.log(`✅ Fetched ${data.length} driver interest submissions`);

    return c.json({ 
      success: true,
      data,
      total: count,
      limit,
      offset
    });

  } catch (error) {
    console.error("Error in driver-interest GET endpoint:", error);
    return c.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, 500);
  }
});

// Update driver interest status (admin use)
contact.patch("/driver-interest/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { status, notes } = body;

    if (!status) {
      return c.json({ error: "Status is required" }, 400);
    }

    const validStatuses = ['new', 'contacted', 'converted', 'declined'];
    if (!validStatuses.includes(status)) {
      return c.json({ 
        error: "Invalid status",
        validStatuses 
      }, 400);
    }

    const supabase = getSupabaseClient();
    
    console.log(`Updating driver interest ${id} to status: ${status}`);

    const updateData: any = { status };
    if (notes) {
      updateData.notes = notes;
    }

    const { data, error } = await supabase
      .from('driver_interest')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Database error updating driver interest:", error);
      return c.json({ 
        error: "Failed to update driver interest",
        details: error.message 
      }, 500);
    }

    console.log(`✅ Driver interest ${id} updated successfully`);

    return c.json({ 
      success: true,
      data
    });

  } catch (error) {
    console.error("Error in driver-interest PATCH endpoint:", error);
    return c.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, 500);
  }
});

// =====================================================
// DRIVER APPLICATIONS
// =====================================================

// Submit full driver application
contact.post("/driver-application", async (c) => {
  try {
    const body = await c.req.json();
    
    const {
      // Personal Information
      email,
      first_name,
      last_name,
      phone,
      postcode,
      address_line_1,
      address_line_2,
      city,
      county,
      
      // Vehicle Information
      vehicle_type,
      vehicle_make,
      vehicle_model,
      vehicle_year,
      vehicle_registration,
      vehicle_colour,
      vehicle_capacity,
      
      // Documentation
      driving_licence_number,
      driving_licence_expiry,
      mot_expiry_date,
      insurance_provider,
      insurance_policy_number,
      insurance_expiry,
      goods_in_transit_insurance,
      
      // Availability
      availability_notes,
      typical_routes,
      preferred_days,
      preferred_times,
    } = body;

    // Validate required fields
    if (!email || !first_name || !last_name || !phone || !postcode || !vehicle_type) {
      console.error("Validation error: Missing required fields");
      return c.json({ 
        error: "Required fields missing",
        required: ["email", "first_name", "last_name", "phone", "postcode", "vehicle_type"]
      }, 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Validation error: Invalid email format");
      return c.json({ error: "Invalid email format" }, 400);
    }

    // Validate vehicle type
    const validVehicleTypes = ['SWB', 'LWB', 'Luton', 'Other'];
    if (!validVehicleTypes.includes(vehicle_type)) {
      return c.json({ 
        error: "Invalid vehicle type",
        validTypes: validVehicleTypes 
      }, 400);
    }

    const supabase = getSupabaseClient();
    
    console.log("Attempting to save driver application for:", email);

    // Helper function to convert empty strings to null for date fields
    const sanitizeDate = (dateValue: any) => {
      if (!dateValue || dateValue === '') return null;
      return dateValue;
    };

    // Helper function to convert empty strings to null for number fields
    const sanitizeNumber = (numValue: any) => {
      if (!numValue || numValue === '') return null;
      return numValue;
    };

    // Insert into driver_applications table
    const { data, error } = await supabase
      .from('driver_applications')
      .insert([{
        email,
        first_name,
        last_name,
        phone,
        postcode,
        address_line_1: address_line_1 || null,
        address_line_2: address_line_2 || null,
        city: city || null,
        county: county || null,
        vehicle_type,
        vehicle_make: vehicle_make || null,
        vehicle_model: vehicle_model || null,
        vehicle_year: sanitizeNumber(vehicle_year),
        vehicle_registration: vehicle_registration || null,
        vehicle_colour: vehicle_colour || null,
        vehicle_capacity: vehicle_capacity || null,
        driving_licence_number: driving_licence_number || null,
        driving_licence_expiry: sanitizeDate(driving_licence_expiry),
        mot_expiry_date: sanitizeDate(mot_expiry_date),
        insurance_provider: insurance_provider || null,
        insurance_policy_number: insurance_policy_number || null,
        insurance_expiry: sanitizeDate(insurance_expiry),
        goods_in_transit_insurance: goods_in_transit_insurance || false,
        availability_notes: availability_notes || null,
        typical_routes: typical_routes || null,
        preferred_days: preferred_days || null,
        preferred_times: preferred_times || null,
        status: 'pending',
      }])
      .select()
      .single();

    if (error) {
      console.error("Database error saving driver application:", error);
      console.error("Error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return c.json({ 
        error: "Failed to save driver application",
        details: error.message,
        hint: error.hint
      }, 500);
    }

    console.log("✅ Driver application submitted successfully:", data.id);

    return c.json({ 
      success: true,
      message: "Driver application submitted successfully",
      id: data.id
    });

  } catch (error) {
    console.error("Error in driver-application endpoint:", error);
    return c.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, 500);
  }
});

// Get all driver applications (admin use)
contact.get("/driver-applications", async (c) => {
  try {
    const supabase = getSupabaseClient();
    
    // Get query parameters for filtering
    const status = c.req.query("status");
    const limit = parseInt(c.req.query("limit") || "50");
    const offset = parseInt(c.req.query("offset") || "0");

    console.log(`Fetching driver applications (status: ${status || 'all'}, limit: ${limit}, offset: ${offset})`);

    let query = supabase
      .from('driver_applications')
      .select('*', { count: 'exact' })
      .order('submitted_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Database error fetching driver applications:", error);
      return c.json({ 
        error: "Failed to fetch driver applications",
        details: error.message 
      }, 500);
    }

    console.log(`✅ Fetched ${data.length} driver applications`);

    return c.json({ 
      success: true,
      data,
      total: count,
      limit,
      offset
    });

  } catch (error) {
    console.error("Error in driver-applications GET endpoint:", error);
    return c.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, 500);
  }
});

// Get single driver application by ID
contact.get("/driver-application/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const supabase = getSupabaseClient();
    
    console.log(`Fetching driver application: ${id}`);

    const { data, error } = await supabase
      .from('driver_applications')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Database error fetching driver application:", error);
      return c.json({ 
        error: "Failed to fetch driver application",
        details: error.message 
      }, 404);
    }

    console.log(`✅ Fetched driver application ${id}`);

    return c.json({ 
      success: true,
      data
    });

  } catch (error) {
    console.error("Error in driver-application GET endpoint:", error);
    return c.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, 500);
  }
});

// Update driver application status (admin use)
contact.patch("/driver-application/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const { 
      status, 
      rejection_reason, 
      admin_notes,
      // Document verification flags
      driving_licence_verified,
      mot_verified,
      insurance_verified,
      git_insurance_verified,
      dbs_check_status,
      dbs_check_date,
    } = body;

    if (status) {
      const validStatuses = ['pending', 'under_review', 'approved', 'rejected', 'withdrawn'];
      if (!validStatuses.includes(status)) {
        return c.json({ 
          error: "Invalid status",
          validStatuses 
        }, 400);
      }
    }

    const supabase = getSupabaseClient();
    
    console.log(`Updating driver application ${id}`);

    const updateData: any = {};
    
    if (status) {
      updateData.status = status;
      if (status === 'approved' || status === 'rejected') {
        updateData.reviewed_at = new Date().toISOString();
      }
    }
    
    if (rejection_reason !== undefined) updateData.rejection_reason = rejection_reason;
    if (admin_notes !== undefined) updateData.admin_notes = admin_notes;
    if (driving_licence_verified !== undefined) updateData.driving_licence_verified = driving_licence_verified;
    if (mot_verified !== undefined) updateData.mot_verified = mot_verified;
    if (insurance_verified !== undefined) updateData.insurance_verified = insurance_verified;
    if (git_insurance_verified !== undefined) updateData.git_insurance_verified = git_insurance_verified;
    if (dbs_check_status !== undefined) updateData.dbs_check_status = dbs_check_status;
    if (dbs_check_date !== undefined) updateData.dbs_check_date = dbs_check_date;

    const { data, error } = await supabase
      .from('driver_applications')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Database error updating driver application:", error);
      return c.json({ 
        error: "Failed to update driver application",
        details: error.message 
      }, 500);
    }

    console.log(`✅ Driver application ${id} updated successfully`);

    return c.json({ 
      success: true,
      data
    });

  } catch (error) {
    console.error("Error in driver-application PATCH endpoint:", error);
    return c.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, 500);
  }
});

// =====================================================
// DRIVER PROFILES (Active Drivers)
// =====================================================

// Get all active driver profiles
contact.get("/driver-profiles", async (c) => {
  try {
    const supabase = getSupabaseClient();
    
    // Get query parameters for filtering
    const status = c.req.query("status") || 'active';
    const postcode = c.req.query("postcode");
    const limit = parseInt(c.req.query("limit") || "50");
    const offset = parseInt(c.req.query("offset") || "0");

    console.log(`Fetching driver profiles (status: ${status}, limit: ${limit}, offset: ${offset})`);

    let query = supabase
      .from('driver_profiles')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    if (postcode) {
      query = query.like('home_postcode', `${postcode}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Database error fetching driver profiles:", error);
      return c.json({ 
        error: "Failed to fetch driver profiles",
        details: error.message 
      }, 500);
    }

    console.log(`✅ Fetched ${data.length} driver profiles`);

    return c.json({ 
      success: true,
      data,
      total: count,
      limit,
      offset
    });

  } catch (error) {
    console.error("Error in driver-profiles GET endpoint:", error);
    return c.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, 500);
  }
});

// Get single driver profile
contact.get("/driver-profile/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const supabase = getSupabaseClient();
    
    console.log(`Fetching driver profile: ${id}`);

    const { data, error } = await supabase
      .from('driver_profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Database error fetching driver profile:", error);
      return c.json({ 
        error: "Failed to fetch driver profile",
        details: error.message 
      }, 404);
    }

    console.log(`✅ Fetched driver profile ${id}`);

    return c.json({ 
      success: true,
      data
    });

  } catch (error) {
    console.error("Error in driver-profile GET endpoint:", error);
    return c.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, 500);
  }
});

// Update driver profile
contact.patch("/driver-profile/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const supabase = getSupabaseClient();
    
    console.log(`Updating driver profile ${id}`);

    // Only allow specific fields to be updated
    const allowedFields = [
      'phone', 'profile_photo_url', 'status', 'onboarding_completed', 
      'onboarding_completed_at', 'current_vehicle_registration', 'current_vehicle_type',
      'home_postcode', 'primary_coverage_area', 'coverage_radius_miles',
      'device_tokens', 'app_version', 'last_login_at',
      'bank_account_verified', 'payment_schedule'
    ];

    const updateData: any = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return c.json({ error: "No valid fields to update" }, 400);
    }

    const { data, error } = await supabase
      .from('driver_profiles')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Database error updating driver profile:", error);
      return c.json({ 
        error: "Failed to update driver profile",
        details: error.message 
      }, 500);
    }

    console.log(`✅ Driver profile ${id} updated successfully`);

    return c.json({ 
      success: true,
      data
    });

  } catch (error) {
    console.error("Error in driver-profile PATCH endpoint:", error);
    return c.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, 500);
  }
});

// =====================================================
// DEMO REQUESTS (Driver Demo Requests)
// =====================================================

// Submit driver demo request
contact.post("/demo", async (c) => {
  try {
    const body = await c.req.json();
    
    const {
      name,
      email,
      phone,
      company_name,
      message,
      demo_type,
      source,
    } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      console.error("Validation error: Missing required fields");
      return c.json({ 
        error: "Required fields missing",
        required: ["name", "email", "phone"]
      }, 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Validation error: Invalid email format");
      return c.json({ error: "Invalid email format" }, 400);
    }

    const supabase = getSupabaseClient();
    
    console.log("Attempting to save driver demo request for:", email);

    // Insert into driver_demo_requests table
    const { data, error } = await supabase
      .from('driver_demo_requests')
      .insert([{
        name,
        email,
        phone,
        company_name,
        message,
        demo_type: demo_type || 'driver_app',
        source: source || 'drivers_page',
        status: 'new',
      }])
      .select()
      .single();

    if (error) {
      console.error("Database error saving driver demo request:", error);
      return c.json({ 
        error: "Failed to save driver demo request",
        details: error.message 
      }, 500);
    }
    
    console.log("✅ Driver demo request submitted successfully:", data.id);
    
    return c.json({ 
      success: true,
      message: "Driver demo request submitted successfully",
      id: data.id
    });

  } catch (error) {
    console.error("Error in demo endpoint:", error);
    return c.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, 500);
  }
});

// Get all driver demo requests (admin use)
contact.get("/demo-requests", async (c) => {
  try {
    const supabase = getSupabaseClient();
    
    // Get query parameters for filtering
    const status = c.req.query("status");
    const limit = parseInt(c.req.query("limit") || "50");
    const offset = parseInt(c.req.query("offset") || "0");

    console.log(`Fetching driver demo requests (status: ${status || 'all'}, limit: ${limit}, offset: ${offset})`);

    let query = supabase
      .from('driver_demo_requests')
      .select('*', { count: 'exact' })
      .order('submitted_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Database error fetching driver demo requests:", error);
      return c.json({ 
        error: "Failed to fetch driver demo requests",
        details: error.message 
      }, 500);
    }

    console.log(`✅ Fetched ${data.length} driver demo requests`);

    return c.json({ 
      success: true,
      data,
      total: count,
      limit,
      offset
    });

  } catch (error) {
    console.error("Error in demo-requests GET endpoint:", error);
    return c.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, 500);
  }
});

// Get single driver demo request by ID
contact.get("/demo-request/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const supabase = getSupabaseClient();
    
    console.log(`Fetching driver demo request: ${id}`);

    const { data, error } = await supabase
      .from('driver_demo_requests')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Database error fetching driver demo request:", error);
      return c.json({ 
        error: "Failed to fetch driver demo request",
        details: error.message 
      }, 404);
    }

    console.log(`✅ Fetched driver demo request ${id}`);

    return c.json({ 
      success: true,
      data
    });

  } catch (error) {
    console.error("Error in demo-request GET endpoint:", error);
    return c.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, 500);
  }
});

// Update driver demo request status (admin use)
contact.patch("/demo-request/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const { 
      status, 
      scheduled_at,
      completed_at,
      admin_notes,
      assigned_to,
    } = body;

    if (status) {
      const validStatuses = ['new', 'contacted', 'scheduled', 'completed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return c.json({ 
          error: "Invalid status",
          validStatuses 
        }, 400);
      }
    }

    const supabase = getSupabaseClient();
    
    console.log(`Updating driver demo request ${id}`);

    const updateData: any = {};
    
    if (status) updateData.status = status;
    if (scheduled_at !== undefined) updateData.scheduled_at = scheduled_at;
    if (completed_at !== undefined) updateData.completed_at = completed_at;
    if (admin_notes !== undefined) updateData.admin_notes = admin_notes;
    if (assigned_to !== undefined) updateData.assigned_to = assigned_to;

    if (Object.keys(updateData).length === 0) {
      return c.json({ error: "No valid fields to update" }, 400);
    }

    const { data, error } = await supabase
      .from('driver_demo_requests')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Database error updating driver demo request:", error);
      return c.json({ 
        error: "Failed to update driver demo request",
        details: error.message 
      }, 500);
    }

    console.log(`✅ Driver demo request ${id} updated successfully`);

    return c.json({ 
      success: true,
      data
    });

  } catch (error) {
    console.error("Error in demo-request PATCH endpoint:", error);
    return c.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, 500);
  }
});

export default contact;