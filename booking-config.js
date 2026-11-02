/**
 * Tyler Ergonomics — single booking configuration.
 *
 * TE_BOOKING_URL is the only place the scheduler link is set.
 * Every element with data-booking uses this URL.
 */
var TE_BOOKING_URL = "https://calendly.com/rick-tylerwork/free-ergonomic-discovery-call";

function teBookingUrl() {
  var url = (typeof TE_BOOKING_URL === "string" ? TE_BOOKING_URL : "").trim();
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (/^[a-z0-9._/-]+\.html(?:#[A-Za-z0-9_-]+)?$/i.test(url)) return url;
  if (/^#[A-Za-z0-9_-]+$/i.test(url)) return url;
  return "";
}
