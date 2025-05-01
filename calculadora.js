document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("solar-calculator-form");
    const resultsDiv = document.getElementById("calculator-results");
    const systemSizeSpan = document.getElementById("system-size");
    const monthlySavingsSpan = document.getElementById("monthly-savings");
    const annualSavingsSpan = document.getElementById("annual-savings");
    const paybackTimeSpan = document.getElementById("payback-time");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent default form submission

            const avgBill = parseFloat(document.getElementById("avg-bill").value);
            const region = document.getElementById("region").value;

            if (isNaN(avgBill) || avgBill <= 0 || !region) {
                alert("Por favor, preencha todos os campos corretamente.");
                return;
            }

            // --- Calculation Logic (Simplified Estimates) ---

            // 1. Estimate Annual Consumption (kWh)
            // Assuming an average tariff (e.g., R$ 0.85/kWh - adjust as needed)
            const avgTariff = 0.85;
            const estimatedAnnualConsumption = (avgBill / avgTariff) * 12;

            // 2. Estimate System Size (kWp)
            // Generation factor (kWh/kWp/year) varies by region (simplified)
            let generationFactor = 1450; // Default/Average
            switch (region) {
                case "curitiba":
                case "sc_florianopolis":
                    generationFactor = 1400;
                    break;
                case "litoral_pr":
                case "sc_litoral_norte":
                    generationFactor = 1350; // Slightly lower due to coastal factors
                    break;
                case "oeste_pr":
                case "sc_oeste":
                    generationFactor = 1550; // Higher irradiation inland
                    break;
            }
            // Add a small buffer (e.g., 10%) to cover losses and ensure savings
            const requiredGeneration = estimatedAnnualConsumption * 1.10;
            const systemSizeKwp = requiredGeneration / generationFactor;

            // 3. Estimate Annual Savings (R$)
            // Assuming 95% reduction on the bill value (common target)
            const annualSavings = avgBill * 12 * 0.95;
            const monthlySavings = annualSavings / 12;

            // 4. Estimate Investment (R$)
            // Average cost per kWp (e.g., R$ 3500/kWp - adjust based on market)
            let costPerKwp = 3500;
            if (systemSizeKwp < 4) costPerKwp = 4000; // Smaller systems tend to be more expensive per kWp
            else if (systemSizeKwp > 10) costPerKwp = 3200; // Larger systems might be cheaper per kWp
            const estimatedInvestment = systemSizeKwp * costPerKwp;

            // 5. Estimate Payback Time (Years)
            const paybackTimeYears = estimatedInvestment / annualSavings;

            // --- Display Results ---
            systemSizeSpan.textContent = systemSizeKwp.toFixed(2) + " kWp";
            monthlySavingsSpan.textContent = "R$ " + monthlySavings.toFixed(2).replace(".", ",");
            annualSavingsSpan.textContent = "R$ " + annualSavings.toFixed(2).replace(".", ",");
            paybackTimeSpan.textContent = paybackTimeYears.toFixed(1).replace(".", ",") + " anos";

            resultsDiv.style.display = "block"; // Show results section
        });
    }
});

