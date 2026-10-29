/**
 * Tyler Ergonomics — single booking configuration.
 *
 * TE_BOOKING_URL is the only place to add a scheduler or payment link.
 * Paste a full https URL when you have one, for example:
 *   var TE_BOOKING_URL = "https://example.com/your-scheduler";
 *
 * Leave it as an empty string until that link exists.
 * Do not put a guessed URL here.
 *
 * While this is empty, each booking control keeps the destination already
 * written on it:
 *   - "Book an assessment" opens the contact form on the Services page
 *     (te-02-services.html#book).
 *   - Home office buttons that already point at the live Calendly event
 *     stay on that event.
 *
 * The site says individuals book and pay online. There is no payment
 * link yet. Adding one belongs on the line above, not in the page copy.
 */
var TE_BOOKING_URL = "";

function teBookingUrl() {
  var url = (typeof TE_BOOKING_URL === "string" ? TE_BOOKING_URL : "").trim();
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (/^[a-z0-9._/-]+\.html(?:#[A-Za-z0-9_-]+)?$/i.test(url)) return url;
  if (/^#[A-Za-z0-9_-]+$/i.test(url)) return url;
  return "";
}
