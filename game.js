document.addEventListener('DOMContentLoaded', () => {

    // --- OYUN VERİLERİ (CONFIG) ---

    // --- RÜTBE VERİLERİ ---
    const RANKS = {
    1: 'Çavuş',
    2: 'Teğmen',
    3: 'General'
    };

    const CHARACTERS = {
        'char1': { 
            name: 'Acid Pol', 
            cost: 1000, 
            levels: [
                { stats: { damage: 1, maxHp: 100, defense: 5 }, image: { avatar: 'assets/char1_lvl1_avatar.png', full: 'assets/char1_lvl1_full.png' }, xpToNext: 1000 },
                { stats: { damage: 2, maxHp: 120, defense: 8 }, image: { avatar: 'assets/char1_lvl2_avatar.png', full: 'assets/char1_lvl2_full.png' }, xpToNext: 5000 },
                { stats: { damage: 4, maxHp: 150, defense: 12 }, image: { avatar: 'assets/char1_lvl3_avatar.png', full: 'assets/char1_lvl3_full.png' }, xpToNext: Infinity }
            ]
        },
        'char2': { 
            name: 'Tarantula', 
            cost: 5000, 
            levels: [
                { stats: { damage: 3, maxHp: 80, defense: 3 }, image: { avatar: 'assets/char2_lvl1_avatar.png', full: 'assets/char2_lvl1_full.png' }, xpToNext: 25000 },
                { stats: { damage: 5, maxHp: 100, defense: 5 }, image: { avatar: 'assets/char2_lvl2_avatar.png', full: 'assets/char2_lvl2_full.png' }, xpToNext: 100000 },
                { stats: { damage: 8, maxHp: 130, defense: 8 }, image: { avatar: 'assets/char2_lvl3_avatar.png', full: 'assets/char2_lvl3_full.png' }, xpToNext: Infinity }
            ]
        },
        'char3': { 
            name: 'Viper Red', 
            cost: 18000, 
            levels: [
                { stats: { damage: 6, maxHp: 120, defense: 4 }, image: { avatar: 'assets/char3_lvl1_avatar.png', full: 'assets/char3_lvl1_full.png' }, xpToNext: 30000 },
                { stats: { damage: 10, maxHp: 126, defense: 7 }, image: { avatar: 'assets/char3_lvl2_avatar.png', full: 'assets/char3_lvl2_full.png' }, xpToNext: 100000 },
                { stats: { damage: 16, maxHp: 132, defense: 10 }, image: { avatar: 'assets/char3_lvl3_avatar.png', full: 'assets/char3_lvl3_full.png' }, xpToNext: Infinity }
            ]
        },
        'char4': { 
            name: 'Hide', 
            cost: 29000, 
            levels: [
                { stats: { damage: 8, maxHp: 120, defense: 5 }, image: { avatar: 'assets/char4_lvl1_avatar.png', full: 'assets/char4_lvl1_full.png' }, xpToNext: 35000 },
                { stats: { damage: 16, maxHp: 126, defense: 8 }, image: { avatar: 'assets/char4_lvl2_avatar.png', full: 'assets/char4_lvl2_full.png' }, xpToNext: 190000 },
                { stats: { damage: 26, maxHp: 142, defense: 11 }, image: { avatar: 'assets/char4_lvl3_avatar.png', full: 'assets/char4_lvl3_full.png' }, xpToNext: Infinity }
            ]
        },
        'char5': { 
            name: 'Chou', 
            cost: 35000, 
            levels: [
                { stats: { damage: 10, maxHp: 120, defense: 6 }, image: { avatar: 'assets/char5_lvl1_avatar.png', full: 'assets/char5_lvl1_full.png' }, xpToNext: 40000 },
                { stats: { damage: 20, maxHp: 132, defense: 10 }, image: { avatar: 'assets/char5_lvl2_avatar.png', full: 'assets/char5_lvl2_full.png' }, xpToNext: 200000 },
                { stats: { damage: 30, maxHp: 156, defense: 13 }, image: { avatar: 'assets/char5_lvl3_avatar.png', full: 'assets/char5_lvl3_full.png' }, xpToNext: Infinity }
            ]
        }
        
    };


    const MAPS = {
        'map1': { name: 'Eğitim Kampı', image: 'assets/map_egitim_kampi.png', unlockCost: 0, baseCashPerKill: 1, baseXpPerKill: 2, damagePerSecond: 1 },
        'map2': { name: 'Burning Hall', image: 'assets/map_burning_hall.png', unlockCost: 10000, baseCashPerKill: 3, baseXpPerKill: 5, damagePerSecond: 3 },
        'map3': { name: 'Kütüphane', image: 'assets/map_kutuphane.png', unlockCost: 50000, baseCashPerKill: 15, baseXpPerKill: 10, damagePerSecond: 5 },
        'map4': { name: 'Down Town', image: 'assets/map_downtown.png', unlockCost: 250000, baseCashPerKill: 25, baseXpPerKill: 20, damagePerSecond: 10 },
        'map5': { name: 'Lux Ville', image: 'assets/map_luxville.png', unlockCost: 1000000, baseCashPerKill: 50, baseXpPerKill: 40, damagePerSecond: 15 },
    };
    
    const WEAPONS = {
        'k1':       { name: 'K-1',          image: 'assets/weapon_k1.png',       cost: 0,        stats: { damage: 1, fireRate: 3,  magazine: 20, bulletsPerKill: 4.0 } },
        'm4a1':     { name: 'M4A1',         image: 'assets/weapon_m4a1.png',     cost: 25000,    stats: { damage: 2, fireRate: 10, magazine: 25, bulletsPerKill: 2.5 } },
        'sc2010':   { name: 'SC-2010',      image: 'assets/weapon_sc2010.png',   cost: 75000,    stats: { damage: 4, fireRate: 8,  magazine: 25, bulletsPerKill: 2.0 } },
        'oa93':     { name: 'OA-93',        image: 'assets/weapon_oa93.png',     cost: 200000,   stats: { damage: 6, fireRate: 12, magazine: 30, bulletsPerKill: 1.8 } },
        'kriss':    { name: 'Kriss S.V',    image: 'assets/weapon_kriss.png',    cost: 600000,   stats: { damage: 9, fireRate: 11, magazine: 35, bulletsPerKill: 1.4 } },
        'aug':      { name: 'AUG A3',       image: 'assets/weapon_aug.png',      cost: 1500000,  stats: { damage: 12,fireRate: 9,  magazine: 45, bulletsPerKill: 1.1 } }
    };

    const UPGRADES = {
    'fast_heal_1': {
        name: 'Gelişmiş Tıbbi Kit',
        description: 'İyileşme hızını %50 artırır.',
        cost: 50000,
        type: 'HEAL_BOOST',
        value: 1.5
    },
    'auto_deploy_auth': {
        name: 'Otomatik Görev Yetkisi',
        description: 'İyileşen askerleri seçilen haritaya otomatik gönderir.',
        cost: 200000,
        type: 'UNLOCK_AUTODEPLOY'
    }
    };

    const BASE_UPGRADES = [
    // level: hedeflenen seviye, cost: yükseltme maliyeti, slotsGained: kazanılan slot sayısı
    // Başlangıç Üssü (Mevcut Seviye 1)
    { level: 1, name: "Derme Çatma Karargah", cost: 0, slotsGained: 0 },
    { level: 2, name: "Genişletilmiş Kışla", cost: 250000, slotsGained: 3 },
    { level: 3, name: "Gelişmiş Komuta Merkezi", cost: 1000000, slotsGained: 3 },
    { level: 4, name: "Taktik Operasyon Birimi", cost: 5000000, slotsGained: 3 },
    { level: 5, name: "Elit Eğitim Tesisi", cost: 20000000, slotsGained: 3 },
    { level: 6, name: "Uydu Haberleşme Kulesi", cost: 100000000, slotsGained: 3 },
    { level: 7, name: "Silah Araştırma Laboratuvarı", cost: 500000000, slotsGained: 3 },
    { level: 8, name: "Zırhlı Araç Garajı", cost: 2500000000, slotsGained: 3 },
    { level: 9, name: "Global Lojistik Merkezi", cost: 10000000000, slotsGained: 3 },
    { level: 10, name: "Yörünge Silah Platformu", cost: 50000000000, slotsGained: 3 },
    { level: 11, name: "Gölge Operasyonları Direktörlüğü", cost: 250000000000, slotsGained: 3 },
    ];

    // --- OYUN DURUMU (STATE) ---
    let gameState = {
        playerName: null, playerAvatarId: 'assets/avatar1.png',
        cash: 3000, baseLevel: 1,
        unlockedMaps: ['map1'], unlockedWeapons: ['k1'], unlockedUpgrades: [], 
        healingSpeedMultiplier: 1, autoDeployUnlocked: false,
        totalKills: 0, totalXp: 0, totalCashEarned: 0, timePlayedInSeconds: 0,
        slots: [
            { characterId: null, level: 1, xp: 0, currentHp: 100, isRecovering: false, onMission: false, mapId: null, weaponId: 'k1', bulletsInMagazine: 30, isReloading: false, autoDeployEnabled: false, autoDeployMapId: 'map1' },
            { characterId: null, level: 1, xp: 0, currentHp: 100, isRecovering: false, onMission: false, mapId: null, weaponId: 'k1', bulletsInMagazine: 30, isReloading: false, autoDeployEnabled: false, autoDeployMapId: 'map1' },
            { characterId: null, level: 1, xp: 0, currentHp: 100, isRecovering: false, onMission: false, mapId: null, weaponId: 'k1', bulletsInMagazine: 30, isReloading: false, autoDeployEnabled: false, autoDeployMapId: 'map1' }
        ]
    };

    // --- DOM ELEMENTLERİ ---
    const cashAmountEl = document.getElementById('cash-amount');
    const mercenarySlotsEl = document.getElementById('mercenary-slots');
    const mapsContainerEl = document.getElementById('maps-container');
    const characterShopEl = document.getElementById('character-shop');
    const weaponShopEl = document.getElementById('weapon-shop');
    const upgradeShopEl = document.getElementById('upgrade-shop');
    const baseInfoContainer = document.getElementById('base-info-container');
    const deployModal = document.getElementById('deploy-modal');
    const modalCharName = document.getElementById('modal-char-name');
    const modalMapsList = document.getElementById('modal-maps-list');
    const modalDeployCancelBtn = document.getElementById('modal-deploy-cancel-btn');
    let selectedSlotForDeploy = null;
    const equipWeaponModal = document.getElementById('equip-weapon-modal');
    const modalEquipCharName = document.getElementById('modal-equip-char-name');
    const modalWeaponsList = document.getElementById('modal-weapons-list');
    const modalEquipCancelBtn = document.getElementById('modal-equip-cancel-btn');
    let selectedSlotForEquip = null;
    const resetLink = document.getElementById('reset-game-link');

    // --- KAYIT SİSTEMİ FONKSİYONLARI ---
    function saveGame() { try { localStorage.setItem('noktaAtisiMangasiSave', JSON.stringify(gameState)); } catch (e) { console.error("HATA: Oyun kaydedilemedi!", e); } }
    function loadGame() { try { const savedData = localStorage.getItem('noktaAtisiMangasiSave'); if (savedData === null || savedData === 'undefined') return; const loadedState = JSON.parse(savedData); Object.assign(gameState, loadedState); console.log("Kayıtlı oyun başarıyla yüklendi!"); } catch(e) { console.error("HATA: Kayıtlı veri yüklenemedi, muhtemelen bozuk.", e); } }
    function resetGameData(askConfirmation = true) { const confirmation = askConfirmation ? confirm("TÜM İLERLEMENİZ KALICI OLARAK SİLİNECEK! Bu işlem geri alınamaz. Emin misiniz?") : true; if (confirmation) { localStorage.removeItem('noktaAtisiMangasiSave'); window.location.reload(); } }
    
    // --- YARDIMCI FONKSİYONLAR ---
    function getRankName(level) { return RANKS[level] || `Seviye ${level}`; }
    function createStatBarHTML(label, value, max = 20) { const percentage = (value / max) * 100; return `<div title="${label}: ${value}" style="font-size: 0.8em; margin-top:5px; text-align: left;">${label}<div class="stat-bar"><div class="stat-bar-fill" style="width: ${percentage}%;"></div></div></div>`; }
    function showNotification(message, type = 'info') { const feed = document.getElementById('notification-feed'); if (!feed) return; const notification = document.createElement('div'); notification.className = `notification-item ${type}`; notification.textContent = message; feed.insertBefore(notification, feed.firstChild); setTimeout(() => { notification.remove(); }, 5000); }
    function formatTime(totalSeconds) { const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0'); const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0'); const seconds = (totalSeconds % 60).toString().padStart(2, '0'); return `${hours}:${minutes}:${seconds}`; }

    // --- ARAYÜZ GÜNCELLEME FONKSİYONLARI ---
    function updateDynamicElements() {
        cashAmountEl.textContent = Math.floor(gameState.cash).toLocaleString();
        renderSlots();
        renderMaps();
        renderShop();
        renderWeaponShop();
        renderUpgradeShop();
        renderBaseInfo();
        renderStatistics();
    }
    function renderAllUI() { updateDynamicElements(); }

    function renderSlots() {
        mercenarySlotsEl.innerHTML = '';
        gameState.slots.forEach((slot, index) => {
            const slotEl = document.createElement('div');
            slotEl.id = `slot-${index}`;
            slotEl.classList.add('card');
            if (slot.characterId) {
                const baseChar = CHARACTERS[slot.characterId];
                const currentLevelData = baseChar.levels[slot.level - 1];
                const weapon = WEAPONS[slot.weaponId];
                const rankName = getRankName(slot.level);
                let statusText;
                if (slot.isRecovering) { statusText = `<span class="recovering-status">İyileşiyor...</span>`; }
                else if (slot.onMission) { statusText = `${MAPS[slot.mapId].name} haritasında.`; if (slot.isReloading) { statusText += ``; } }
                else { statusText = 'Boşta Bekliyor'; }
                const maxHp = currentLevelData.stats.maxHp;
                const hpPercentage = (slot.currentHp / maxHp) * 100;
                const xpForNextLevel = currentLevelData.xpToNext;
                const xpPercentage = (xpForNextLevel === Infinity) ? 100 : (slot.xp / xpForNextLevel) * 100;

                const mainContentHTML = `
                    <div class="slot-content">
                        <img src="${currentLevelData.image.avatar}" alt="${baseChar.name}" class="slot-avatar">
                        <div class="slot-info">
                            <h4>${baseChar.name} - ${rankName}</h4>
                            <p>${statusText}</p>
                            <p class="bar-label">Can</p>
                            <div class="hp-bar-container" title="Can: ${Math.ceil(slot.currentHp)} / ${maxHp}"><div class="hp-bar-fill" style="width: ${hpPercentage}%;"></div></div>
                            <p class="bar-label">Exp</p>
                            <div class="xp-bar-container" title="XP: ${Math.floor(slot.xp)} / ${xpForNextLevel}"><div class="xp-bar-fill" style="width: ${xpPercentage}%;"></div></div>
                            <div class="weapon-info"><img src="${weapon.image}" alt="${weapon.name}" class="slot-weapon-icon"> ${weapon.name} (${slot.bulletsInMagazine}/${weapon.stats.magazine})</div>
                        </div>
                    </div>`;
                slotEl.innerHTML = mainContentHTML;
                
                if (gameState.autoDeployUnlocked) {
                    const autoDeployDiv = document.createElement('div');
                    autoDeployDiv.className = 'slot-auto-deploy';
                    const toggleCheckbox = document.createElement('input');
                    toggleCheckbox.type = 'checkbox';
                    toggleCheckbox.id = `auto-deploy-toggle-${index}`;
                    toggleCheckbox.checked = slot.autoDeployEnabled;
                    toggleCheckbox.onchange = () => { gameState.slots[index].autoDeployEnabled = toggleCheckbox.checked; renderSlots(); };
                    const toggleLabel = document.createElement('label');
                    toggleLabel.htmlFor = `auto-deploy-toggle-${index}`;
                    toggleLabel.textContent = 'Oto. Görev';
                    const mapSelect = document.createElement('select');
                    mapSelect.id = `auto-deploy-select-${index}`;
                    mapSelect.disabled = !slot.autoDeployEnabled;
                    gameState.unlockedMaps.forEach(mapId => { const option = document.createElement('option'); option.value = mapId; option.textContent = MAPS[mapId].name; mapSelect.appendChild(option); });
                    mapSelect.value = slot.autoDeployMapId;
                    mapSelect.onchange = (e) => { gameState.slots[index].autoDeployMapId = e.target.value; };
                    autoDeployDiv.appendChild(toggleCheckbox);
                    autoDeployDiv.appendChild(toggleLabel);
                    autoDeployDiv.appendChild(mapSelect);
                    slotEl.querySelector('.slot-info').appendChild(autoDeployDiv);
                }

                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'slot-actions';
                const missionBtn = document.createElement('button');
                missionBtn.textContent = slot.onMission ? 'Geri Çağır' : 'Göreve Gönder';
                missionBtn.disabled = slot.isRecovering;
                missionBtn.onclick = () => { if (slot.onMission) { recallMerc(index); } else { openDeployModal(index); }};
                const equipBtn = document.createElement('button');
                equipBtn.textContent = 'Silah Değiştir';
                equipBtn.disabled = slot.isRecovering;
                equipBtn.onclick = () => openEquipModal(index);
                actionsDiv.appendChild(missionBtn);
                actionsDiv.appendChild(equipBtn);
                const dismissBtn = document.createElement('button');
                dismissBtn.className = 'dismiss-btn';
                dismissBtn.innerHTML = '&times;';
                dismissBtn.title = "Karakteri Kov";
                dismissBtn.onclick = () => dismissMerc(index);
                actionsDiv.appendChild(dismissBtn);
                slotEl.appendChild(actionsDiv);
            } else {
                slotEl.innerHTML = `<h4>Boş Slot</h4><p>Dükkandan bir karakter satın al.</p>`;
            }
            mercenarySlotsEl.appendChild(slotEl);
        });
    }
    
    function renderBaseInfo() {
        if (!baseInfoContainer) return;
        const currentLevel = gameState.baseLevel;
        const currentBase = BASE_UPGRADES[currentLevel - 1];
        const nextUpgrade = BASE_UPGRADES[currentLevel];
        const maxLevels = BASE_UPGRADES.length;
        const progressPercentage = ((currentLevel) / (maxLevels)) * 100;
        let upgradeHTML = '';
        if (nextUpgrade) {
            upgradeHTML = `<div class="next-upgrade-info"><span>Sonraki Seviye: <strong>${nextUpgrade.name}</strong></span><span>+${nextUpgrade.slotsGained} Slot</span></div><button id="upgrade-base-btn" ${gameState.cash < nextUpgrade.cost ? 'disabled' : ''}>Yükselt (${nextUpgrade.cost.toLocaleString()} Cash)</button>`;
        } else {
            upgradeHTML = `<p class="max-level-text">Ana üs maksimum seviyeye ulaştı!</p>`;
        }
        baseInfoContainer.innerHTML = `<div class="base-header"><h3>${currentBase.name}</h3><span>Seviye ${currentLevel}</span></div><div class="base-progress-bar-container"><div class="base-progress-bar-fill" style="width: ${progressPercentage}%;"></div></div><div class="base-stats"><span>Mevcut Kapasite: <strong>${gameState.slots.length}</strong></span><span>Maks. Seviye: <strong>${maxLevels}</strong></span></div><div class="upgrade-section">${upgradeHTML}</div>`;
    }
    
    function renderStatistics() {
        document.getElementById('stats-total-kills').textContent = Math.floor(gameState.totalKills).toLocaleString();
        document.getElementById('stats-total-xp').textContent = Math.floor(gameState.totalXp).toLocaleString();
        document.getElementById('stats-total-cash').textContent = Math.floor(gameState.totalCashEarned).toLocaleString();
        document.getElementById('stats-time-played').textContent = formatTime(gameState.timePlayedInSeconds);
    }

    function renderMaps(){mapsContainerEl.innerHTML='';for(const mapId in MAPS){const map=MAPS[mapId];const mapEl=document.createElement('div');mapEl.classList.add('card');const isUnlocked=gameState.unlockedMaps.includes(mapId);if(!isUnlocked){mapEl.classList.add('locked')}mapEl.innerHTML=`<img src="${map.image}" alt="${map.name}" class="card-image"><h4>${map.name}</h4><p>Ödül: ${map.baseCashPerKill} Cash/Kill | XP: ${map.baseXpPerKill} XP/Kill</p>`;if(!isUnlocked){const unlockBtn=document.createElement('button');unlockBtn.textContent=`Aç (${map.unlockCost.toLocaleString()} Cash)`;unlockBtn.disabled=gameState.cash<map.unlockCost;unlockBtn.onclick=()=>unlockMap(mapId);mapEl.appendChild(unlockBtn)}mapsContainerEl.appendChild(mapEl)}}
    function renderShop(){characterShopEl.innerHTML='';for(const charId in CHARACTERS){const char=CHARACTERS[charId];const level1Data=char.levels[0];const charEl=document.createElement('div');charEl.classList.add('card');charEl.innerHTML=`<img src="${level1Data.image.full}" alt="${char.name}" class="card-image"><h4>${char.name}</h4><div class="stats" style="padding:0 10px">${createStatBarHTML('Hasar Bonusu',level1Data.stats.damage)}${createStatBarHTML('Max Can',level1Data.stats.maxHp,200)}${createStatBarHTML('Savunma',level1Data.stats.defense,50)}</div><p>Fiyat: ${char.cost.toLocaleString()} Cash</p>`;const buyBtn=document.createElement('button');buyBtn.textContent='Satın Al';buyBtn.disabled=gameState.cash<char.cost;buyBtn.onclick=()=>buyCharacter(charId);charEl.appendChild(buyBtn);characterShopEl.appendChild(charEl)}}
    function renderWeaponShop(){weaponShopEl.innerHTML='';for(const weaponId in WEAPONS){if(weaponId==='k1')continue;const weapon=WEAPONS[weaponId];const cardEl=document.createElement('div');cardEl.className='card';cardEl.innerHTML=`<img src="${weapon.image}" alt="${weapon.name}" class="card-image"><h4>${weapon.name}</h4><div class="stats" style="padding:0 10px;font-size:.9em;text-align:left"><p><strong>Hasar:</strong> ${weapon.stats.damage}</p><p><strong>Atış Hızı:</strong> ${weapon.stats.fireRate}/s</p><p><strong>Şarjör:</strong> ${weapon.stats.magazine}</p><p><strong>Verim:</strong> ${weapon.stats.bulletsPerKill} mermi/kill</p></div><p>Fiyat: ${weapon.cost.toLocaleString()} Cash</p>`;const buyBtn=document.createElement('button');const isOwned=gameState.unlockedWeapons.includes(weaponId);if(isOwned){buyBtn.textContent='Satın Alındı';buyBtn.disabled=true}else{buyBtn.textContent='Satın Al';buyBtn.disabled=gameState.cash<weapon.cost;buyBtn.onclick=()=>buyWeapon(weaponId)}cardEl.appendChild(buyBtn);weaponShopEl.appendChild(cardEl)}}
    function renderUpgradeShop(){if(!upgradeShopEl)return;upgradeShopEl.innerHTML='';for(const upgradeId in UPGRADES){const upgrade=UPGRADES[upgradeId];const cardEl=document.createElement('div');cardEl.className='card';cardEl.innerHTML=`<h4>${upgrade.name}</h4><p style="flex-grow:1">${upgrade.description}</p><p>Fiyat: ${upgrade.cost.toLocaleString()} Cash</p>`;const buyBtn=document.createElement('button');const isOwned=gameState.unlockedUpgrades.includes(upgradeId);if(isOwned){buyBtn.textContent='Satın Alındı';buyBtn.disabled=true}else{buyBtn.textContent='Satın Al';buyBtn.disabled=gameState.cash<upgrade.cost;buyBtn.onclick=()=>buyUpgrade(upgradeId)}cardEl.appendChild(buyBtn);upgradeShopEl.appendChild(cardEl)}}

    // --- OYUNCU AKSİYONLARI ---
    function upgradeBase(){const currentLevel=gameState.baseLevel;if(currentLevel>=BASE_UPGRADES.length)return;const nextUpgrade=BASE_UPGRADES[currentLevel];if(gameState.cash>=nextUpgrade.cost){gameState.cash-=nextUpgrade.cost;gameState.baseLevel++;for(let i=0;i<nextUpgrade.slotsGained;i++){gameState.slots.push({characterId:null,level:1,xp:0,currentHp:100,isRecovering:false,onMission:false,mapId:null,weaponId:'k1',bulletsInMagazine:WEAPONS['k1'].stats.magazine,isReloading:false,autoDeployEnabled:false,autoDeployMapId:'map1'})}showNotification(`${nextUpgrade.name} seviyesine yükseltildi!`, 'milestone');renderAllUI()}else{alert("Yeterli paran yok!")}}
    function dismissMerc(slotIndex) {
    const slot = gameState.slots[slotIndex];
    if (!slot.characterId) return; // Zaten boşsa bir şey yapma

    if (slot.onMission) {
        alert("Karakter görevdeyken kovulamaz! Önce üsse geri çağırmalısınız.");
        return;
    }

    if (confirm(`Bu karakteri kovmak istediğinizden emin misiniz? Bu işlem geri alınamaz.`)) {
        
        // DÜZELTME: Slotu silmek yerine, içeriğini boşaltıyoruz.
        gameState.slots[slotIndex] = {
            characterId: null,
            level: 1,
            xp: 0,
            currentHp: 100,
            isRecovering: false,
            onMission: false,
            mapId: null,
            weaponId: 'k1',
            bulletsInMagazine: WEAPONS['k1'].stats.magazine,
            isReloading: false,
            autoDeployEnabled: false,
            autoDeployMapId: 'map1'
        };

        showNotification(`Bir asker kovuldu.`, 'warning');
        renderAllUI(); // Arayüzü güncelle
    }
}
    function buyCharacter(charId) { const character = CHARACTERS[charId]; const currentSlots = gameState.slots.filter(s => s.characterId !== null).length; const maxSlots = gameState.slots.length; if(currentSlots >= maxSlots){alert("Tüm slotların dolu! Yeni slot için üssünü yükselt.");return;} const emptySlotIndex = gameState.slots.findIndex(slot => slot.characterId === null); if (emptySlotIndex !== -1 && gameState.cash >= character.cost) { gameState.cash -= character.cost; const maxHp = character.levels[0].stats.maxHp; gameState.slots[emptySlotIndex] = { characterId: charId, level: 1, xp: 0, currentHp: maxHp, isRecovering: false, onMission: false, mapId: null, weaponId: 'k1', bulletsInMagazine: WEAPONS['k1'].stats.magazine, isReloading: false, autoDeployEnabled: false, autoDeployMapId: 'map1' }; showNotification(`${character.name} ekibe katıldı!`, 'success'); renderAllUI(); } else { alert("Boş slot bulunamadı, bu bir hata olabilir."); } }
    function buyWeapon(weaponId) { const weapon = WEAPONS[weaponId]; if (!gameState.unlockedWeapons.includes(weaponId) && gameState.cash >= weapon.cost) { gameState.cash -= weapon.cost; gameState.unlockedWeapons.push(weaponId); showNotification(`${weapon.name} silahı envantere eklendi!`, 'success'); renderAllUI(); } }
    function unlockMap(mapId) { const map = MAPS[mapId]; if (!gameState.unlockedMaps.includes(mapId) && gameState.cash >= map.unlockCost) { gameState.cash -= map.unlockCost; gameState.unlockedMaps.push(mapId); showNotification(`Yeni görev bölgesi açıldı: ${map.name}`, 'success'); renderAllUI(); } }
    function recallMerc(slotIndex) { gameState.slots[slotIndex].onMission = false; gameState.slots[slotIndex].mapId = null; updateDynamicElements(); }
    function sendMercToMap(slotIndex, mapId) { gameState.slots[slotIndex].onMission = true; gameState.slots[slotIndex].mapId = mapId; closeDeployModal(); updateDynamicElements(); }
    function equipWeapon(slotIndex, weaponId) { const slot = gameState.slots[slotIndex]; const weapon = WEAPONS[weaponId]; slot.weaponId = weaponId; slot.bulletsInMagazine = weapon.stats.magazine; slot.isReloading = false; closeEquipModal(); updateDynamicElements(); }
    function buyUpgrade(upgradeId) { if (gameState.unlockedUpgrades.includes(upgradeId)) return; const upgrade = UPGRADES[upgradeId]; if (gameState.cash >= upgrade.cost) { gameState.cash -= upgrade.cost; gameState.unlockedUpgrades.push(upgradeId); showNotification(`${upgrade.name} yeteneği açıldı!`, 'milestone'); switch (upgrade.type) { case 'HEAL_BOOST': gameState.healingSpeedMultiplier = upgrade.value; break; case 'UNLOCK_AUTODEPLOY': gameState.autoDeployUnlocked = true; break; } renderAllUI(); } }

    // --- OYUN DÖNGÜSÜ ---
    function gameTick() {
        let somethingChanged = true; 
        gameState.timePlayedInSeconds++;
        gameState.slots.forEach((slot, index) => {
            if (!slot.characterId) { return; }
            const baseChar = CHARACTERS[slot.characterId];
            const maxHp = baseChar.levels[slot.level - 1].stats.maxHp;
            if (slot.isRecovering) {
                slot.currentHp += (maxHp * 0.05) * gameState.healingSpeedMultiplier;
                if (slot.currentHp >= maxHp) {
                    slot.currentHp = maxHp;
                    slot.isRecovering = false;
                    if (gameState.autoDeployUnlocked && slot.autoDeployEnabled && slot.autoDeployMapId) {
                        showNotification(`${baseChar.name} iyileşti ve otomatik olarak ${MAPS[slot.autoDeployMapId].name} görevine gönderildi.`, 'info');
                        sendMercToMap(index, slot.autoDeployMapId);
                    }
                }
                return;
            }
            if (slot.onMission) {
                const map = MAPS[slot.mapId];
                const charStats = baseChar.levels[slot.level - 1].stats;
                const damageReduction = 1 - (charStats.defense / 100);
                const damageTaken = map.damagePerSecond * damageReduction;
                slot.currentHp -= damageTaken;
                if (slot.currentHp <= 0) { slot.currentHp = 0; showNotification(`${baseChar.name} ağır yaralandı ve üsse geri döndü!`, 'warning'); recallMerc(index); slot.isRecovering = true; return; }
                if (slot.isReloading) { const weapon = WEAPONS[slot.weaponId]; slot.bulletsInMagazine = weapon.stats.magazine; slot.isReloading = false; return; }
                const weapon = WEAPONS[slot.weaponId];
                let shotsFiredThisTick = weapon.stats.fireRate;
                if (slot.bulletsInMagazine < shotsFiredThisTick) { shotsFiredThisTick = slot.bulletsInMagazine; slot.isReloading = true; }
                slot.bulletsInMagazine -= shotsFiredThisTick;
                const killsThisTick = shotsFiredThisTick / weapon.stats.bulletsPerKill;
                const totalDamage = charStats.damage + weapon.stats.damage;
                const cashGained = killsThisTick * totalDamage * map.baseCashPerKill;
                const xpGained = killsThisTick * totalDamage * map.baseXpPerKill;
                gameState.cash += cashGained;
                gameState.totalCashEarned += cashGained;
                gameState.totalXp += xpGained;
                gameState.totalKills += killsThisTick;
                slot.xp += xpGained;
                checkForLevelUp(index);
            }
        });
        if (somethingChanged) { updateDynamicElements(); }
    }
    function checkForLevelUp(slotIndex) { const slot = gameState.slots[slotIndex]; if (!slot.characterId) return; const baseChar = CHARACTERS[slot.characterId]; const currentLevelData = baseChar.levels[slot.level - 1]; if (slot.level < baseChar.levels.length && slot.xp >= currentLevelData.xpToNext) { slot.level++; slot.xp = 0; const rankName = getRankName(slot.level); showNotification(`${baseChar.name}, ${rankName} rütbesine terfi etti!`, 'milestone'); renderAllUI(); } }
    
    // --- MODALLAR VE OLAY DİNLEYİCİLER ---
    function openDeployModal(slotIndex) { selectedSlotForDeploy = slotIndex; const slot = gameState.slots[slotIndex]; const baseChar = CHARACTERS[slot.characterId]; const rankName = getRankName(slot.level); modalCharName.textContent = `${baseChar.name} - ${rankName}`; modalMapsList.innerHTML = ''; gameState.unlockedMaps.forEach(mapId => { const map = MAPS[mapId]; const mapBtn = document.createElement('button'); const weapon = WEAPONS[slot.weaponId]; const currentLevelData = baseChar.levels[slot.level - 1]; const killsPerSec = (weapon.stats.fireRate / weapon.stats.bulletsPerKill); const totalDmg = currentLevelData.stats.damage + weapon.stats.damage; const earnings = killsPerSec * totalDmg * map.baseCashPerKill; mapBtn.textContent = `${map.name} (+${Math.round(earnings)}/s, -${map.damagePerSecond} HP/s)`; mapBtn.onclick = () => sendMercToMap(selectedSlotForDeploy, mapId); modalMapsList.appendChild(mapBtn); }); deployModal.classList.remove('hidden'); }
    function closeDeployModal() { deployModal.classList.add('hidden'); }
    function openEquipModal(slotIndex) { selectedSlotForEquip = slotIndex; const slot = gameState.slots[slotIndex]; const baseChar = CHARACTERS[slot.characterId]; const rankName = getRankName(slot.level); modalEquipCharName.textContent = `${baseChar.name} - ${rankName}`; modalWeaponsList.innerHTML = ''; gameState.unlockedWeapons.forEach(weaponId => { const weapon = WEAPONS[weaponId]; const weaponBtn = document.createElement('button'); weaponBtn.textContent = `${weapon.name}`; if (slot.weaponId === weaponId) { weaponBtn.disabled = true; weaponBtn.textContent += ' (Kuşanıldı)'; } weaponBtn.onclick = () => equipWeapon(selectedSlotForEquip, weaponId); modalWeaponsList.appendChild(weaponBtn); }); equipWeaponModal.classList.remove('hidden'); }
    function closeEquipModal() { equipWeaponModal.classList.add('hidden'); }
    modalDeployCancelBtn.addEventListener('click', closeDeployModal);
    modalEquipCancelBtn.addEventListener('click', closeEquipModal);
    baseInfoContainer.addEventListener('click', (event) => { if (event.target && event.target.id === 'upgrade-base-btn') { upgradeBase(); } });
    if(resetLink){resetLink.addEventListener('click',()=>resetGameData(true))};

    // --- BAŞLANGIÇ EKRANI MANTIĞI ---
    const welcomeModal = document.getElementById('welcome-modal');
    const startGameBtn = document.getElementById('start-game-btn');
    const nicknameInput = document.getElementById('nickname-input');
    const avatarContainer = document.getElementById('avatar-selection');
    
    function setupWelcomeScreenListeners() {
        if (!startGameBtn || !avatarContainer) return;
        
        avatarContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('avatar-choice')) {
                avatarContainer.querySelector('.selected').classList.remove('selected');
                e.target.classList.add('selected');
            }
        });

        startGameBtn.addEventListener('click', () => {
            const nickname = nicknameInput.value.trim();
            const selectedAvatarEl = avatarContainer.querySelector('.avatar-choice.selected');
            if (nickname.length > 0 && selectedAvatarEl) {
                const avatarSrc = selectedAvatarEl.dataset.avatar;
                startGame(nickname, avatarSrc);
            } else {
                alert("Lütfen bir oyuncu adı girin ve bir avatar seçin.");
            }
        });
    }

    // --- OYUNU BAŞLATMA ---
    function startGame(nickname, avatarId) {
        gameState.playerName = nickname;
        gameState.playerAvatarId = avatarId;
        document.getElementById('player-nickname-display').textContent = nickname;
        document.getElementById('player-avatar-display').src = avatarId;
        document.getElementById('welcome-modal').classList.add('hidden');
        renderAllUI();
        setInterval(gameTick, 1000);
        setInterval(saveGame, 3000);
    }
    function initializeGame() {
        loadGame();
        if (gameState.playerName) {
            startGame(gameState.playerName, gameState.playerAvatarId);
        } else {
            setupWelcomeScreenListeners();
        }
    }
    
    initializeGame();
});
