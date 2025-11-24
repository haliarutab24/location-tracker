export async function GET(req) {
  try {
    // Use your frontend-exposed key
    const apiKey = process.env.NEXT_PUBLIC_IPDATA_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Missing IPData API key" },
        { status: 500 }
      );
    }

    // Auto-detect real user IP (fallback to IPv4)
    let ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      req.ip ||
      "1.1.1.1"; // fallback for localhost

    // Remove IPv6 localhost (::1)
    if (ip === "::1" || ip === "127.0.0.1") {
      ip = "1.1.1.1";
    }

    // Request IPData
    const res = await fetch(`https://api.ipdata.co/${ip}?api-key=${apiKey}`);
    const data = await res.json();

    return Response.json({
      ip: data.ip,
      city: data.city,
      region: data.region,
      country_name: data.country_name,
      latitude: data.latitude,
      longitude: data.longitude,
      asn: data.asn,
      time_zone: data.time_zone,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch IP data" },
      { status: 500 }
    );
  }
}
