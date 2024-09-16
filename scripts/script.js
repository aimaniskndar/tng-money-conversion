function calculate() {
    const amountInput = document.getElementById('amount').value;
    const currency = document.getElementById('currency').value;

    // Remove commas and sanitize the input
    const sanitizedAmount = parseFloat(amountInput.replace(/,/g, ''));

    if (isNaN(sanitizedAmount) || sanitizedAmount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    let exchangeRateBeforeFee, exchangeRateWithFee, resultWithoutFee, resultWithFee;

    if (currency === "JPYtoMYR") {
        // JPY to MYR conversion
        exchangeRateBeforeFee = 1 / 32.08; // Reverse of 32.08 MYR per JPY
    } else {
        // MYR to JPY conversion
        exchangeRateBeforeFee = 32.08; // MYR to JPY rate
    }

    // Apply 1% fee
    exchangeRateWithFee = exchangeRateBeforeFee * 1.01;

    // Calculations for amount to pay
    resultWithoutFee = sanitizedAmount * exchangeRateBeforeFee;
    resultWithFee = sanitizedAmount * exchangeRateWithFee;

    // Function to format amounts with commas and 2 decimal places
    function formatAmount(value) {
        return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    // Display the formatted results in a table
    document.getElementById('result').innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Details</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Exchange Rate (before 1% fee):</strong></td>
                    <td>${exchangeRateBeforeFee.toFixed(4)}</td>
                </tr>
                <tr>
                    <td><strong>Exchange Rate (after 1% fee):</strong></td>
                    <td>${exchangeRateWithFee.toFixed(4)}</td>
                </tr>
                <tr>
                    <td><strong>Amount after conversion (before 1% fee):</strong></td>
                    <td>${currency === "JPYtoMYR" ? 'RM ' : '¥ '}${formatAmount(resultWithoutFee)}</td>
                </tr>
                <tr>
                    <td><strong>Amount after conversion (after 1% fee):</strong></td>
                    <td>${currency === "JPYtoMYR" ? 'RM ' : '¥ '}${formatAmount(resultWithFee)}</td>
                </tr>
            </tbody>
        </table>`;
}
