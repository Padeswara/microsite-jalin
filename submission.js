// Prevent personal details being sent until a submission endpoint is configured.
document.querySelector('.submission-form').addEventListener('submit', (event) => {
  event.preventDefault();
  document.getElementById('submission-status').textContent =
    'Pengiriman belum tersedia. Data Anda belum dikirim.';
});
