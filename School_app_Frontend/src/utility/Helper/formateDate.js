function formatDate(isoString) {
  const date = new Date(isoString);

  // Check if the input is a valid date
  if (isNaN(date)) {
    return "Invalid Date";
  }

  // Format date in MM/DD/YYYY
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString("en-US", options); // You can customize the locale if needed
}

export default formatDate;
