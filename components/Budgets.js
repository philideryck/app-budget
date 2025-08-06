import { appData, setAppData } from '../app.js';
export function Budgets() {
  return `
    <section class="section-transition visible">
      <h2 class="text-2xl font-bold mb-4">Budgets</h2>
      <button onclick="window.addBudget()" class="mb-3 bg-orange-500 text-white px-4 py-2 rounded">+ Nouveau Budget</button>
      <table class="w-full bg-white rounded shadow">
        <thead><tr>
          <th>Catégorie</th><th>Montant</th><th>Actions</th>
        </tr></thead>
        <tbody>
          ${appData.budgets.map(b=>`
            <tr>
              <td>${b.category}</td>
              <td>${b.amount}€</td>
              <td>
                <button onclick="window.editBudget('${b.id}')">✏️</button>
                <button onclick="window.deleteBudget('${b.id}')">🗑️</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>
  `;
}
window.addBudget = function() {
  const cat = prompt('Catégorie ?');
  const amt = parseFloat(prompt('Montant ?','0'));
  if (!cat || isNaN(amt) || amt <= 0) return;
  setAppData({ budgets: [...appData.budgets, { id: Date.now(), category: cat, amount: amt }] });
};
window.editBudget = function(id) {
  const b = appData.budgets.find(x=>x.id==id);
  if (!b) return;
  const cat = prompt('Catégorie ?', b.category);
  const amt = parseFloat(prompt('Montant ?', b.amount));
  if (!cat || isNaN(amt) || amt <= 0) return;
  b.category = cat; b.amount = amt;
  setAppData({ budgets: appData.budgets });
};
window.deleteBudget = function(id) {
  if (confirm('Supprimer ?')) setAppData({ budgets: appData.budgets.filter(x=>x.id!=id) });
};
