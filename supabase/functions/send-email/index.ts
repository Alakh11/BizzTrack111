
// Follow these steps to set up email sending with Resend:
// 1. Create a free account at https://resend.com
// 2. Create an API key at https://resend.com/api-keys
// 3. Add your API key to the Supabase dashboard:
//    Go to your project dashboard → Settings → Functions → Secrets
//    Add a new secret named RESEND_API_KEY with your API key

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  try {
    // Mock response for now - in production you'd use a real email service
    // like Resend, SendGrid, or Mailgun
    const { to, subject, content, recipientName, invoiceId } = await req.json();
    
    // Basic validation
    if (!to || !subject || !content) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // In production, you would use a real email service
    // Example with Resend:
    // const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    // const data = await resend.emails.send({
    //   from: 'Your Business <onboarding@resend.dev>',
    //   to: [to],
    //   subject: subject,
    //   html: content,
    // });

    console.log(`Sending email to ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content: ${content}`);

    // Mock successful response
    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: `mock-msg-${Date.now()}`,
        to, 
        subject
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
