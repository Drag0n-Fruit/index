

const container = document.getElementById('character-container');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');

// 초기 카드 생성
function init() {
    characters.forEach((char, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openModal(index);

        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${char.img}" alt="${char.name}" onerror="this.src='https://placehold.co/400x300?text=No+Image'">
            </div>
            <div class="card-info">
                <span class="role-tag">${char.role}</span>
                <h2>${char.name}</h2>
                <p class="small-info">"${char.hanzul}"</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function openModal(index) {
    const c = characters[index];
    modalContent.innerHTML = `
        <div class="modal-grid">
            <div>
                <img src="${c.img}" style="width:100%; border-radius:10px;" onerror="this.src='https://placehold.co/400x300?text=No+Image'">
                <div class="detail-section" style="margin-top:20px;">
                    <h3>기본 정보</h3>
                    <p>이름 <span style="color: #444444; margin: 0 5px;">|</span> ${c.name}</p>
                    <p>역할 <span style="color: #444444; margin: 0 5px;">|</span> ${c.role}</p>
                    <p>체력 <span style="color: #444444; margin: 0 5px;">|</span> ${c.hp}</p>
                    <p>무기 <span style="color: #444444; margin: 0 5px;">|</span> ${c.weapon}</p>
                    <p><span style="font-size: 0.75rem; color: #636363ff;">제작일: ${c.day}</span></p>
                </div>
            </div>
            <div>
                <div class="detail-section">
                    <h3>배경 및 컨셉</h3>
                    <p><strong>• ${c.concept}</strong></p>
                    <p style="margin-top:10px; color:#ccc;" class="small-info">${c.story}</p>
                </div>
                <div class="detail-section skill-list">
                    <h3><br>패시브 및 스킬</h3>
                    <p>${c.passive}</p>
                    <p style="color:#ccc; margin-left: 6px;" class="small-info">${c.passivea}</p>
                    <hr style="border: none; border-top: 1px solid #444444; margin: 12px 0;">
                    <p>${c.skill1}<span style="font-size: 0.75rem; color: #9c9c9cff; margin: 0 5px;">${c.skill1b}</span></p>
                    <p style="color:#ccc; margin-left: 6px;" class="small-info">${c.skill1a}</p>
                    <p>${c.skill2}<span style="font-size: 0.75rem; color: #9c9c9cff; margin: 0 5px;">${c.skill2b}</span></p>
                    <p style="color:#ccc; margin-left: 6px;" class="small-info">${c.skill2a}</p>
                    <p>${c.skill3}<span style="font-size: 0.75rem; color: #9c9c9cff; margin: 0 5px;">${c.skill3b}</span></p>
                    <p style="color:#ccc; margin-left: 6px;" class="small-info">${c.skill3a}</p>
                    <p><strong>${c.ultimate}</strong><span style="font-size: 0.75rem; color: #9c9c9cff; margin: 0 5px;">${c.ultimateb}</span></p>
                    <p style="color:#ccc; margin-left: 6px;" class="small-info">${c.ultimatea}</p>
                </div>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // 배경 스크롤 복구
}

// 창 바깥 클릭 시 닫기
window.onclick = (event) => {
    if (event.target == modal) closeModal();
};

init();