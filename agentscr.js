
const container = document.getElementById('character-container');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');


const areaOrder = {
    "🌸 아스하리아": 1,
    "📜 알데리온": 2,
    "🌿 실바네르": 3,
    "❄️ 노르하임": 4,
    "🧭 아크론": 5,
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
            <div class="info-container">
                <h1 class="info-name">${c.name}</h1>
                
                <div class="modal-tabs">
                    <button class="tab-btn active" onclick="switchTab(event, 'stat-tab')">개요</button>
                    <button class="tab-btn" onclick="switchTab(event, 'skill-tab')">스킬</button>
                    <button class="tab-btn" onclick="switchTab(event, 'story-tab')">스토리</button>
                </div>

                <div id="stat-tab" class="tab-content active">
                    <div class="info-section">
                        <p class= "info-role">${c.role}</p>
                        <p>❤️ 체력: ${c.hp}</p>
                        <p>⚔️ 무기: ${c.weapon}</p>
                        <p>🎨 제작: ${c.author}</p>
                    </div>
                </div>

                <div id="skill-tab" class="tab-content">
                    <div class="skill-sub-tabs">
                        <button class="skill-sub-btn active" onclick="switchSkill(event, 's1')">스킬 1</button>
                        <button class="skill-sub-btn" onclick="switchSkill(event, 's2')">스킬 2</button>
                        <button class="skill-sub-btn" onclick="switchSkill(event, 's3')">스킬 3</button>
                        <button class="skill-sub-btn" onclick="switchSkill(event, 'ult')">궁극기</button>
                    </div>
                    
                    <div id="skill-display" class="skill-detail-box">
                        <strong style="font-size:1.2rem; color:#00e5ff;">${c.skill1}</strong> <span>${c.skill1b}</span>
                        <p style="margin-top:10px;">${c.skill1a}</p>
                    </div>
                </div>

                <div id="story-tab" class="tab-content">
                    <div class="info-section">
                        <img src="${c.img3}" width="80" height="80" style="margin-bottom: 10px;" onerror="this.src='agents/missing-2.png'">
                        <br><p class="info-role">${c.area}</p>
                        <p class="story-title">"${c.hanzul}"</p>
                        <p class="story-text" style="line-height:1.8;">${c.story}</p>
                    </div>
                </div>
            </div>
            <div class="visual-container">
                <img src="${c.img2}" class="character-full-img" alt="${c.name}">
            </div>
        </div>
    `;

    // 탭 전환을 위해 캐릭터 데이터를 전역 혹은 함수 연결용으로 임시 저장
    window.currentSelectedChar = c;

    modal.style.display = 'flex';
    void modal.offsetWidth;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 상위 탭 전환 함수
function switchTab(event, tabId) {
    const contents = document.querySelectorAll('.tab-content');
    const tabs = document.querySelectorAll('.tab-btn');

    contents.forEach(c => c.classList.remove('active'));
    tabs.forEach(t => t.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// 스킬 세부 전환 함수
function switchSkill(event, skillType) {
    const c = window.currentSelectedChar;
    const display = document.getElementById('skill-display');
    const buttons = document.querySelectorAll('.skill-sub-btn');

    buttons.forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');

    let html = '';
    if (skillType === 's1') {
        html = `<strong style="font-size:1.2rem; color:#00e5ff;">${c.skill1}</strong> <span>${c.skill1b}</span><p style="margin-top:10px;">${c.skill1a}</p>`;
    } else if (skillType === 's2') {
        html = `<strong style="font-size:1.2rem; color:#00e5ff;">${c.skill2}</strong> <span>${c.skill2b}</span><p style="margin-top:10px;">${c.skill2a}</p>`;
    } else if (skillType === 's3') {
        html = `<strong style="font-size:1.2rem; color:#00e5ff;">${c.skill3}</strong> <span>${c.skill3b}</span><p style="margin-top:10px;">${c.skill3a}</p>`;
    } else if (skillType === 'ult') {
        html = `<strong style="font-size:1.2rem; color:#00e5ff;">${c.ultimate}</strong> <span class="ult-tag">${c.ultimateb}</span><p style="margin-top:10px;">${c.ultimatea}</p>`;
    }

    display.innerHTML = html;
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