
const SUPABASE_URL = 'https://osfwskxvrnmiqmzdlksj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zZndza3h2cm5taXFtemRsa3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NzYzNzYsImV4cCI6MjA4MjE1MjM3Nn0.-iJHk5mOyu_yJIulTky4uGOdHfPYjAo-X_Gy6OsJNVo';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


let myUserId = localStorage.getItem('character_user_id');
if (!myUserId) {
    myUserId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('character_user_id', myUserId);
}

const container = document.getElementById('character-container');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');

let myVotes = [];

// 초기화 함수
async function init() {
    try {
        // 투표 데이터 가져오기 (에러 핸들링 추가)
        const { data, error } = await client
            .from('votes')
            .select('character_id')
            .eq('user_id', myUserId);

        if (error) throw error;

        myVotes = data ? data.map(v => Number(v.character_id)) : [];
        renderCards();
    } catch (e) {
        console.error("초기화 중 오류 발생:", e);
        renderCards();
    }
}


// 카드 렌더링 함수 (투표 상태 반영)
function renderCards() {
    container.innerHTML = '';
    characters.forEach((char, index) => {
        const isVoted = myVotes.includes(Number(char.code));
        const card = document.createElement('div');
        card.className = `card ${isVoted ? 'voted' : ''}`;
        card.onclick = () => openModal(index);

        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${char.img}" alt="${char.name}" onerror="this.src='https://placehold.co/400x300?text=No+Image'">
            </div>
            <div class="card-info">
                <span class="role-tag">${char.role}</span>
                <h2>${char.name}</h2>
                <p class="small-info">"${char.hanzul}"</p>
                <button class="vote-btn ${isVoted ? 'active' : ''}" onclick="toggleVote(event, ${char.code}, ${index})">
                    ${isVoted ? '👍 투표취소' : '👍 투표하기'}
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}


// 투표 토글 기능 (DB 연동)
async function toggleVote(event, charCode, index) {
    if (event) event.stopPropagation();

    const code = Number(charCode);
    const isVoted = myVotes.includes(code);
    
    try {
        if (isVoted) {
            // 투표 취소
            const { error } = await client
                .from('votes')
                .delete()
                .eq('character_id', code)
                .eq('user_id', myUserId);

            if (error) throw error;
            myVotes = myVotes.filter(v => v !== code);
        } else {
            // 투표 하기
            const { error } = await client
                .from('votes')
                .insert([{ character_id: code, user_id: myUserId }]);

            if (error) throw error;
            myVotes.push(code);
        }

        renderCards();
        if (modal.style.display === 'flex') openModal(index);
    } catch (err) {
        console.error("투표 처리 중 오류:", err.message);
        alert("투표 처리에 실패했습니다. DB 설정을 확인해주세요.");
    }
}



function openModal(index) {
    const c = characters[index];
    const isVoted = myVotes.includes(c.code);

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
                    
                    <!-- 모달 내부에도 투표 버튼 배치 -->
                    <button class="modal-vote-btn ${isVoted ? 'active' : ''}" onclick="toggleVote(event, '${c.code}', ${index})" style="width:100%; padding:10px; margin-top:10px; cursor:pointer;">
                        ${isVoted ? '👍 투표됨 (취소)' : '👍 투표하기'}
                    </button>
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
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = (event) => {
    if (event.target == modal) closeModal();
};

init();