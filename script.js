    function downloadAnswers() {
      const form = document.getElementById("riskForm");
      const formData = new FormData(form);
      const data = {};
      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "risikovurdering.json";
      link.click();
    }

    document.addEventListener('DOMContentLoaded', function () {
      const q10Radios = document.querySelectorAll('input[name="q10"]');
      const gdprSection = document.getElementById('gdpr-followup');

      q10Radios.forEach(radio => {
        radio.addEventListener('change', function () {
          gdprSection.style.display = this.value === 'Ja' ? 'block' : 'none';
        });
      });
    });
