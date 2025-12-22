// agentscr.js 수정본
const container = document.getElementById('character-container');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');

// 지역 정렬 순서 정의
const areaOrder = {
    "🌸 아스하리아": 1,
    "📜 알데리온": 2,
    "🌿 실바네르": 3
};

// 1. 초기 실행 및 렌더링 함수
function renderCards(data) {
    // 기존 내용 비우기
    container.innerHTML = '';

    data.forEach((char, index) => {
        // 원본 배열(characters)에서의 실제 인덱스를 찾아야 모달이 정확히 뜹니다.
        const originalIndex = characters.findIndex(c => c.num === char.num);

        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openModal(originalIndex);

        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${char.img}" alt="${char.name}" onerror="this.src='https://placehold.co/400x300?text=No+Image'">
            </div>
            <div class="card-info">
                <span class="role-tag">${char.role}</span> <span class="role-tag">${char.area}</span>
                <h2>${char.name} <span class="agent-num">NO.${char.num}</span></h2>
                <p class="small-info">"${char.hanzul}"</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// 2. 정렬 함수
function sortCards(type) {
    let sortedData = [...characters]; // 원본 복사

    if (type === 'name') {
        // 이름 가나다순
        sortedData.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    } else if (type === 'num') {
        // 번호 순서 (문자열 "01" 등을 숫자로 변환하여 비교)
        sortedData.sort((a, b) => parseInt(a.num) - parseInt(b.num));
    } else if (type === 'area') {
        // 지역 순서 (아스하리아 -> 알데리온 -> 실바네르)
        sortedData.sort((a, b) => {
            return (areaOrder[a.area] || 99) - (areaOrder[b.area] || 99);
        });
    }
    // 'default'인 경우 복사본 그대로(원본 순서) 사용

    renderCards(sortedData);
}

// 3. 모달 열기 (기존 로직 동일)
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
                    <p>소속 지역 <span style="color: #444444; margin: 0 5px;">|</span> ${c.area}</p>
                    <p><span style="font-size: 0.75rem; color: #8f8f8fff;">제작자: ${c.author}</span></p>
                </div>
            </div>
            <div>
                <div class="detail-section">
                    <h3>배경 스토리</h3>
                    <p><strong>• ${c.story_a}</strong></p>
                    <p style="margin-top:10px; color:#ccc;" class="small-info">⠀${c.story}</p>
                </div>
                <div class="detail-section skill-list">
                    <h3><br>패시브 및 스킬</h3>
                    <p>${c.passive || '없음'}</p>
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
                <div class="detail-section">
                    <h3><br>운용 및 성능</h3>
                    <p><strong>• ${c.operation_a}</strong></p>
                    <p style="margin-top:10px; color:#ccc;" class="small-info">⠀${c.operation}</p>
                </div>
                <div class="detail-section">
                    <h3><br>여담</h3>
                    <p style="margin-top:10px; color:#ccc;" class="small-info">${c.digression}</p>
                </div>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = (event) => {
    if (event.target == modal) closeModal();
};

// 초기화: 기본 순서로 시작
renderCards(characters);