    function downloadAnswers() {
      const form = document.getElementById("riskForm");
      const formData = new FormData(form);
      const data = {};
      for (const [key, value] of formData.entries()) {
        if (data.hasOwnProperty(key)) {
          if (Array.isArray(data[key])) {
            data[key].push(value);
          } else {
            data[key] = [data[key], value];
          }
        } else {
          data[key] = value;
        }
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

    const emailLink = document.getElementById('emailLink');
    const q1Input = document.querySelector('input[name="q1"]');

      function updateEmailSubject() {
        const systemName = q1Input.value.trim() || '[Systemnavn]';
        const subject = encodeURIComponent(`${systemName} - Risikovurdering`);
        emailLink.href = `mailto:sos@slagelse.dk?subject=${subject}`;
      }

      q1Input.addEventListener('input', updateEmailSubject);
      updateEmailSubject();
