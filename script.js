// --- MBU Uganda Homepage Interactivity ---
document.addEventListener("DOMContentLoaded", function() {
	// Smooth scroll navigation
	document.querySelectorAll('nav a').forEach(function(link) {
		link.addEventListener('click', function(e) {
			const href = link.getAttribute('href');
			if (href.startsWith('#')) {
				e.preventDefault();
				const target = document.querySelector(href);
				if (target) {
					target.scrollIntoView({ behavior: 'smooth' });
				}
			}
		});
	});

	// Search bar functionality (filters stories by title)
	const searchForm = document.querySelector('.search-bar');
	const searchInput = searchForm ? searchForm.querySelector('input') : null;
	const storiesGrid = document.querySelector('.stories-grid');
	if (searchForm && searchInput && storiesGrid) {
		searchForm.addEventListener('submit', function(e) {
			e.preventDefault();
			const query = searchInput.value.trim().toLowerCase();
			storiesGrid.querySelectorAll('article').forEach(function(card) {
				const title = card.querySelector('h3').textContent.toLowerCase();
				card.style.display = title.includes(query) ? '' : 'none';
			});
		});
	}

	// Story card click: show modal with details
	const storyCards = document.querySelectorAll('.stories-grid article');
	storyCards.forEach(function(card) {
		card.addEventListener('click', function() {
			showStoryModal(card);
		});
	});

	// Modal logic
	function showStoryModal(card) {
		let modal = document.getElementById('storyModal');
		if (!modal) {
			modal = document.createElement('div');
			modal.id = 'storyModal';
			Object.assign(modal.style, {
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100vw',
				height: '100vh',
				background: 'rgba(0,0,0,0.8)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 9999
			});
			document.body.appendChild(modal);
		}
		modal.innerHTML = '';
		const modalContent = document.createElement('div');
		Object.assign(modalContent.style, {
			background: '#fff',
			borderRadius: '16px',
			padding: '32px 24px',
			maxWidth: '400px',
			width: '90%',
			textAlign: 'center',
			position: 'relative'
		});
		const closeBtn = document.createElement('span');
		closeBtn.textContent = '×';
		Object.assign(closeBtn.style, {
			position: 'absolute',
			top: '12px',
			right: '18px',
			fontSize: '2em',
			cursor: 'pointer',
			color: '#333'
		});
		closeBtn.onclick = function() {
			modal.style.display = 'none';
		};
		modalContent.appendChild(closeBtn);
		modalContent.innerHTML += card.innerHTML;
		modal.appendChild(modalContent);
		modal.style.display = 'flex';
	}
});
