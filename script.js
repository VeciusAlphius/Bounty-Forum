// Simple Static Version JS (no backend)
// Tab navigation
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Highlight active button
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // Show relevant tab
    const target = btn.dataset.tab;
    tabContents.forEach(tc => {
      tc.classList.toggle('active', tc.id === target + '-tab');
    });
  });
});

// Dummy localStorage data for demo purpose
const DEFAULT_BOUNTIES = [
  {
    id: 'BN1',
    targetName: 'Jax Targon',
    species: 'Twi'lek',
    location: 'Tatooine',
    reward: 12000,
    difficulty: 'Moderate',
    type: 'Alive',
    status: 'Open',
  },
  {
    id: 'BN2',
    targetName: 'Sovek Kane',
    species: 'Human',
    location: 'Corellia',
    reward: 5000,
    difficulty: 'Easy',
    type: 'Information Only',
    status: 'Open',
  },
  {
    id: 'BN3',
    targetName: 'Krux the Hutt',
    species: 'Hutt',
    location: 'Nal Hutta',
    reward: 45000,
    difficulty: 'Extreme',
    type: 'Dead or Alive',
    status: 'Open',
  }
];

function getStoredBounties() {
  const stored = JSON.parse(localStorage.getItem('bounties') || 'null');
  if (!stored) {
    localStorage.setItem('bounties', JSON.stringify(DEFAULT_BOUNTIES));
    return DEFAULT_BOUNTIES;
  }
  return stored;
}

function saveBounties(data) {
  localStorage.setItem('bounties', JSON.stringify(data));
}

// Render bounties
const bountyGrid = document.getElementById('bounty-grid');
function renderBounties(list) {
  bountyGrid.innerHTML = '';
  if (!list.length) {
    document.getElementById('no-bounties').style.display = 'block';
    return;
  }
  document.getElementById('no-bounties').style.display = 'none';
  list.forEach(b => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${b.targetName}</h3>
      <p><strong>Species:</strong> ${b.species}</p>
      <p><strong>Location:</strong> ${b.location}</p>
      <p><strong>Type:</strong> ${b.type}</p>
      <p><strong>Difficulty:</strong> ${b.difficulty}</p>
      <p class="reward">Reward: ${b.reward.toLocaleString()} credits</p>
      <button class="btn btn-primary claim-btn" data-id="${b.id}">Claim</button>
    `;
    bountyGrid.appendChild(card);
  });
}

renderBounties(getStoredBounties());

// Form submission (local only)
const bountyForm = document.getElementById('bounty-form');
bountyForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(bountyForm);
  const bounty = {
    id: 'BN' + Date.now(),
    targetName: formData.get('target-name'),
    species: formData.get('target-species'),
    location: formData.get('target-location'),
    reward: Number(formData.get('reward-amount')),
    difficulty: formData.get('difficulty'),
    type: formData.get('bounty-type'),
    status: 'Open',
  };
  const current = getStoredBounties();
  current.push(bounty);
  saveBounties(current);
  bountyForm.reset();
  alert('Bounty submitted (local demo).');
});
