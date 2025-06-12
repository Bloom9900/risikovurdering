    function getFormData() {
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
      return data;
    }

    function downloadAnswers() {
      const data = getFormData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "risikovurdering.json";
      link.click();
    }

    function getQuestionLabel(key) {
      const field = document.querySelector(`[name="${key}"]`);
      if (field) {
        const wrapper = field.closest('.question');
        if (wrapper) {
          const heading = wrapper.querySelector('h3');
          if (heading) {
            return heading.textContent.trim();
          }
        }
      }
      return key;
    }

    function showSanitizedAnswers() {
      const data = getFormData();
      const sensitiveFields = ['q1', 'q2', 'q3', 'q4'];

      sensitiveFields.forEach(f => {
        delete data[f];
        delete data[`${f}_other`];
      });

      let text = '';
      for (const [key, value] of Object.entries(data)) {
        if (sensitiveFields.some(f => key.startsWith(f))) continue;
        if (value === '') continue;
        const label = getQuestionLabel(key);
        if (Array.isArray(value)) {
          text += `${label}: ${value.join('; ')}\n`;
        } else {
          text += `${label}: ${value}\n`;
        }
      }

      const preview = document.getElementById('answerPreview');
      preview.value = text.trim();
      preview.style.display = 'block';
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
