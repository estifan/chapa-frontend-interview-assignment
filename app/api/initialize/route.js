
export async function POST(req) {
    const transactionData = await req.json();
    const url = "https://api.chapa.co/v1/transaction/initialize";

    const payload = {
        amount: transactionData.amount,
        currency: transactionData.currency,
        email: transactionData.email,
        first_name: transactionData.first_name,
        last_name: transactionData.last_name,
        phone_number: transactionData.phone_number,
        // tx_ref: "chewatatest-6669",
        callback_url: "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
        return_url: "https://www.google.com/",
    };

    const headers = {
        'Authorization': 'Bearer CHASECK_TEST-HcZne52U2RVP3kwJlwxyBY8VF29snRhT',
        'Content-Type': 'application/json'
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    })
    const data = await response.json()


    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });

}
