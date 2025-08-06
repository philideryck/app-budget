import { appData } from '../app.js';
export function Dashboard() {
  // Example chart
  setTimeout(() => {
    const ctx = document.getElementById('trends-chart');
    if (ctx && window.Chart) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
          datasets: [{
            label: 'Solde',
            data: [200, 350, 400, 220, 550, 470],
            borderColor: '#f97316', backgroundColor: 'rgba(251,146,60,0.2)'
          }]
        },
        options: { plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true}} }
      });
    }
  }, 0);

  return `
    <section class="section-transition visible">
      <h2 class="text-2xl font-bold mb-4">Dashboard</h2>
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-white p-4 rounded-lg shadow text-green-700 font-semibold">Revenus<br><span class="text-2xl">${appData.transactions.filter(t=>t.type==='Revenu').reduce((a,b)=>a+b.amount,0)}€</span></div>
        <div class="bg-white p-4 rounded-lg shadow text-red-700 font-semibold">Dépenses<br><span class="text-2xl">${appData.transactions.filter(t=>t.type==='Dépense').reduce((a,b)=>a+b.amount,0)}€</span></div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <canvas id="trends-chart" height="120"></canvas>
      </div>
    </section>
  `;
}
