
const container = document.getElementById('character-container');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');


const areaOrder = {
    "🌸 아스하리아": 1,
    "📜 알데리온": 2,
    "🌿 실바네르": 3,
    "❓ 불명": 99
};


function renderCards(data) {
    container.innerHTML = '';
    data.forEach((char, index) => {
        const originalIndex = characters.findIndex(c => c.num === char.num);

        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openModal(originalIndex);

        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${char.img}" alt="${char.name}" onerror="this.src='https://placehold.co/400x300?text=No+Image'">
            </div>
            <div class="card-info">
                
                <h2>${char.name} <span class="agent-num"></span></h2>
            </div>
        `;
        container.appendChild(card);

        setTimeout(() => {
            card.classList.add('show');
        }, index * 50);
    });
}
//<span class="role-tag">${char.role}</span> <span class="role-tag">${char.area}</span>
function sortCards(type) {
    let sortedData = [...characters];

    if (type === 'name') {
        // 가나다순
        sortedData.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    } else if (type === 'num') {
        // 출시 순
        sortedData.sort((a, b) => parseInt(a.num) - parseInt(b.num));
    } else if (type === 'area') {
        // 지역 순
        sortedData.sort((a, b) => {
            return (areaOrder[a.area] || 99) - (areaOrder[b.area] || 99);
        });
    }

    renderCards(sortedData);
}


function openModal(index) {
    const c = characters[index];
    modalContent.innerHTML = `
        <div class="agent-detail-wrapper">
        <div class="visual-container">
            <div class="bg-huge-text">${c.name}</div>
            <img src="${c.img2}" class="character-full-img" alt="${c.name}">
            <div class="visual-overlay"></div>
        </div>

        <div class="info-container">
            <div class="info-header">
                <div class="info-title-group">
                    <h1 class="info-name">${c.name}</h1>
                    <span class="info-role">${c.role} / ${c.area}</span>
                </div>
            </div>

            <div class="info-grid">
                <div class="info-section">
                    <h3>배경 스토리</h3>
                    <p class="story-title">• ${c.story_a}</p>
                    <p class="story-text">${c.story}</p>
                </div>
                
                <div class="info-section">
                    <h3>스킬 정보</h3>
                    <div class="skill-item"><strong>${c.skill1}</strong> <span>${c.skill1b}</span><br>${c.skill1a}</div>
                    <div class="skill-item"><strong>${c.ultimate}</strong> <span class="ult-tag">${c.ultimateb}</span><br>${c.ultimatea}</div>
                </div>

                <div class="info-section">
                    <h3>운용 정보</h3>
                    <p class="story-text">${c.operation_a}</p>
                    <p class="digression-text">${c.digression}</p>
                </div>
            </div>
        </div>
    </div>
    `;
    modal.style.display = 'flex';
    void modal.offsetWidth;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 400);
    document.body.style.overflow = 'auto';
}

window.onclick = (event) => {
    if (event.target == modal) closeModal();
};


// reset
renderCards(characters);