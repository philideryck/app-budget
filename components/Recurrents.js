import { appData, setAppData } from '../app.js';
export function Recurrents() {
  return `
    <section class="section-transition visible">
      <h2 class="text-2xl font-bold mb-4">Récurrences</h2>
      <button onclick="window.addRecurrent()" class="mb-3 bg-orange-500 text-white px-4 py-2 rounded">+ Nouvelle Récurrence</button>
      <table class="w-full bg-white rounded shadow">
        <thead><tr>
          <th>Description</th><th>Catégorie</th><th>Montant</th><th>Fréquence</th><th>Actions</th>
        </tr></thead>
        <tbody>
          ${appData.recurrents.map(r=>`
            <tr>
              <td>${r.description}</td>
              <td>${r.category}</td>
              <td>${r.amount}€</td>
              <td>${r.frequency}</td>
              <td>
                <button onclick="window.editRecurrent('${r.id}')">✏️</button>
                <button onclick="window.deleteRecurrent('${r.id}')">🗑️</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>
  `;
}
window.addRecurrent = function() {
  const description = prompt('Description ?');
  const category = prompt('Catégorie ?');
  const amount = parseFloat(prompt('Montant ?','0'));
  const frequency = prompt('Fréquence ? (Quotidien/Mensuel/Annuel)');
  if (!description || !category || isNaN(amount) || amount <= 0 || !frequency) return;
  setAppData({ recurrents: [...appData.recurrents, { id: Date.now(), description, category, amount, frequency }] });
};
window.editRecurrent = function(id) {
  const r = appData.recurrents.find(x=>x.id==id);
  if (!r) return;
  const description = prompt('Description ?', r.description);
  const category = prompt('Catégorie ?', r.category);
  const amount = parseFloat(prompt('Montant ?', r.amount));
  const frequency = prompt('Fréquence ?', r.frequency);
  if (!description || !category || isNaN(amount) || amount <= 0 || !frequency) return;
  r.description = description; r.category = category; r.amount = amount; r.frequency = frequency;
  setAppData({ recurrents: appData.recurrents });
};
window.deleteRecurrent = function(id) {
  if (confirm('Supprimer ?')) setAppData({ recurrents: appData.recurrents.filter(x=>x.id!=id) });
};
