//@ts-nocheck
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export async function fetchData(
  url,
  amount = 1000,
  currency = "USD",
  paymment_intent = ""
) {
  try {
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        currency: currency,
        paymment_intent: paymment_intent,
      }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    // 5. Handle any errors during the fetch or parsing process
    console.error("util.ts line 34: Error fetching data:", error);
    // You might want to re-throw the error or return a specific error object
    throw error;
  }
}
export const toCurrency = (value: number) => formatter.format(value / 100);
export const asoneModName = window.asoneModName;
export const asoneId = window.asoneId;
export const asoneIdx = window.asoneIdx;
export const asonePath = window.asonePath;
export const asoneArea = window.asoneArea;
export const asoneLoc = window.asoneLoc;
export const asoneData = JSON.parse(atob(window.asoneData));
export const asoneDataHTML = JSON.parse(atob(window.asoneDataHTML));
