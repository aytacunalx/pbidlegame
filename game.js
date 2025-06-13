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
            cost: 100, 
            levels: [
                { stats: { damage: 1, maxHp: 100, defense: 5 }, image: { avatar: 'assets/char1_lvl1_avatar.png', full: 'assets/char1_lvl1_full.png' }, xpToNext: 1000 },
                { stats: { damage: 2, maxHp: 120, defense: 8 }, image: { avatar: 'assets/char1_lvl2_avatar.png', full: 'assets/char1_lvl2_full.png' }, xpToNext: 5000 },
                { stats: { damage: 4, maxHp: 150, defense: 12 }, image: { avatar: 'assets/char1_lvl3_avatar.png', full: 'assets/char1_lvl3_full.png' }, xpToNext: Infinity }
            ]
        },
        'char2': { 
            name: 'Tarantula', 
            cost: 500, 
            levels: [
                { stats: { damage: 3, maxHp: 80, defense: 3 }, image: { avatar: 'assets/char2_lvl1_avatar.png', full: 'assets/char2_lvl1_full.png' }, xpToNext: 2500 },
                { stats: { damage: 5, maxHp: 100, defense: 5 }, image: { avatar: 'assets/char2_lvl2_avatar.png', full: 'assets/char2_lvl2_full.png' }, xpToNext: 10000 },
                { stats: { damage: 8, maxHp: 130, defense: 8 }, image: { avatar: 'assets/char2_lvl3_avatar.png', full: 'assets/char2_lvl3_full.png' }, xpToNext: Infinity }
            ]
        },
        'char3': { 
            name: 'Viper Red', 
            cost: 1800, 
            levels: [
                { stats: { damage: 6, maxHp: 120, defense: 4 }, image: { avatar: 'assets/char3_lvl1_avatar.png', full: 'assets/char3_lvl1_full.png' }, xpToNext: 3500 },
                { stats: { damage: 10, maxHp: 126, defense: 7 }, image: { avatar: 'assets/char3_lvl2_avatar.png', full: 'assets/char3_lvl2_full.png' }, xpToNext: 12000 },
                { stats: { damage: 16, maxHp: 132, defense: 10 }, image: { avatar: 'assets/char3_lvl3_avatar.png', full: 'assets/char3_lvl3_full.png' }, xpToNext: Infinity }
            ]
        },
        'char4': { 
            name: 'Hide', 
            cost: 2900, 
            levels: [
                { stats: { damage: 8, maxHp: 120, defense: 5 }, image: { avatar: 'assets/char4_lvl1_avatar.png', full: 'assets/char4_lvl1_full.png' }, xpToNext: 3500 },
                { stats: { damage: 16, maxHp: 126, defense: 8 }, image: { avatar: 'assets/char4_lvl2_avatar.png', full: 'assets/char4_lvl2_full.png' }, xpToNext: 12000 },
                { stats: { damage: 26, maxHp: 142, defense: 11 }, image: { avatar: 'assets/char4_lvl3_avatar.png', full: 'assets/char4_lvl3_full.png' }, xpToNext: Infinity }
            ]
        },
        'char5': { 
            name: 'Chou', 
            cost: 3500, 
            levels: [
                { stats: { damage: 10, maxHp: 120, defense: 6 }, image: { avatar: 'assets/char5_lvl1_avatar.png', full: 'assets/char5_lvl1_full.png' }, xpToNext: 4000 },
                { stats: { damage: 20, maxHp: 132, defense: 10 }, image: { avatar: 'assets/char5_lvl2_avatar.png', full: 'assets/char5_lvl2_full.png' }, xpToNext: 20000 },
                { stats: { damage: 30, maxHp: 156, defense: 13 }, image: { avatar: 'assets/char5_lvl3_avatar.png', full: 'assets/char5_lvl3_full.png' }, xpToNext: Infinity }
            ]
        }
        
    };


    const MAPS = {
        'map1': { name: 'Eğitim Kampı', image: 'assets/map_egitim_kampi.png', unlockCost: 0, baseCashPerKill: 1, baseXpPerKill: 2, damagePerSecond: 1 },
        'map2': { name: 'Burning Hall', image: 'assets/map_burning_hall.png', unlockCost: 10000, baseCashPerKill: 15, baseXpPerKill: 10, damagePerSecond: 3 },
        'map3': { name: 'Kütüphane', image: 'assets/map_kutuphane.png', unlockCost: 50000, baseCashPerKill: 25, baseXpPerKill: 25, damagePerSecond: 8 },
        'map4': { name: 'Down Town', image: 'assets/map_downtown.png', unlockCost: 250000, baseCashPerKill: 50, baseXpPerKill: 80, damagePerSecond: 15 },
        'map5': { name: 'Lux Ville', image: 'assets/map_luxville.png', unlockCost: 1000000, baseCashPerKill: 200, baseXpPerKill: 300, damagePerSecond: 25 },
    };
    
    const WEAPONS = {
        'k1':       { name: 'K-1',          image: 'assets/weapon_k1.png',       cost: 0,        stats: { damage: 1, fireRate: 3,  magazine: 20, bulletsPerKill: 4.0 } },
        'm4a1':     { name: 'M4A1',         image: 'assets/weapon_m4a1.png',     cost: 2500,    stats: { damage: 2, fireRate: 10, magazine: 25, bulletsPerKill: 2.5 } },
        'sc2010':   { name: 'SC-2010',      image: 'assets/weapon_sc2010.png',   cost: 7500,    stats: { damage: 4, fireRate: 8,  magazine: 25, bulletsPerKill: 2.0 } },
        'oa93':     { name: 'OA-93',        image: 'assets/weapon_oa93.png',     cost: 20000,   stats: { damage: 6, fireRate: 12, magazine: 30, bulletsPerKill: 1.8 } },
        'kriss':    { name: 'Kriss S.V',    image: 'assets/weapon_kriss.png',    cost: 60000,   stats: { damage: 9, fireRate: 11, magazine: 35, bulletsPerKill: 1.4 } },
        'aug':      { name: 'AUG A3',       image: 'assets/weapon_aug.png',      cost: 150000,  stats: { damage: 12,fireRate: 9,  magazine: 45, bulletsPerKill: 1.1 } }
    };

    // --- OYUN DURUMU (STATE) ---
    let gameState = {
        cash: 300,
        maxSlots: 1,
        nextSlotCost: 500,
        unlockedMaps: ['map1'],
        unlockedWeapons: ['k1'],
        slots: [
            { characterId: null, level: 1, xp: 0, currentHp: 100, isRecovering: false, onMission: false, mapId: null, weaponId: 'k1', bulletsInMagazine: 30, isReloading: false }
        ]
    };

    




    // --- DOM ELEMENTLERİ ---
    const cashAmountEl = document.getElementById('cash-amount');
    const mercenarySlotsEl = document.getElementById('mercenary-slots');
    const unlockSlotBtn = document.getElementById('unlock-slot-btn');
    const mapsContainerEl = document.getElementById('maps-container');
    const characterShopEl = document.getElementById('character-shop');
    const weaponShopEl = document.getElementById('weapon-shop');
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

    // --- OYUN MOTORU (GAME LOOP) ---

    setInterval(gameTick, 1000);
   

    function gameTick() {
        let somethingChanged = false;

        gameState.slots.forEach((slot, index) => {
            if (!slot.characterId) {
                return; 
            }

            const baseChar = CHARACTERS[slot.characterId];
            const maxHp = baseChar.levels[slot.level - 1].stats.maxHp;
            
            if (slot.isRecovering) {
                somethingChanged = true;
                slot.currentHp += maxHp * 0.05; // Saniyede canın %5'i kadar iyileşsin
                if (slot.currentHp >= maxHp) {
                    slot.currentHp = maxHp;
                    slot.isRecovering = false;
                }
                return; 
            }
            
            if (slot.onMission) {
                somethingChanged = true;
                const map = MAPS[slot.mapId];
                const charStats = baseChar.levels[slot.level - 1].stats;
                
                const damageReduction = 1 - (charStats.defense / 100);
                const damageTaken = map.damagePerSecond * damageReduction;
                slot.currentHp -= damageTaken;

                if (slot.currentHp <= 0) {
                    slot.currentHp = 0;
                    recallMerc(index);
                    slot.isRecovering = true;
                    return;
                }
                
                if (slot.isReloading) {
                    const weapon = WEAPONS[slot.weaponId];
                    slot.bulletsInMagazine = weapon.stats.magazine;
                    slot.isReloading = false;
                    return;
                }
                
                const weapon = WEAPONS[slot.weaponId];
                let shotsFiredThisTick = weapon.stats.fireRate;
                if (slot.bulletsInMagazine < shotsFiredThisTick) {
                    shotsFiredThisTick = slot.bulletsInMagazine;
                    slot.isReloading = true;
                }
                slot.bulletsInMagazine -= shotsFiredThisTick;

                const killsThisTick = shotsFiredThisTick / weapon.stats.bulletsPerKill;
                const totalDamage = charStats.damage + weapon.stats.damage;
                const cashGained = killsThisTick * totalDamage * map.baseCashPerKill;
                const xpGained = killsThisTick * totalDamage * map.baseXpPerKill;

                gameState.cash += cashGained;
                slot.xp += xpGained;
                
                checkForLevelUp(index);
            }
        });

        if (somethingChanged) {
            updateDynamicElements();
        }
    }

    function checkForLevelUp(slotIndex) {
        const slot = gameState.slots[slotIndex];
        if (!slot.characterId) return;

        const baseChar = CHARACTERS[slot.characterId];
        const currentLevelData = baseChar.levels[slot.level - 1];

        if (slot.level < baseChar.levels.length && slot.xp >= currentLevelData.xpToNext) {
            slot.level++;
            slot.xp = 0;
            console.log(`${baseChar.name} Rütbe ${slot.level}'e yükseldi!`);
            renderSlots();
        }
    }

    // --- ARAYÜZ GÜNCELLEME FONKSİYONLARI ---

    /**
    
    * @param {number} level 
     * @returns {string} 
    */
    function getRankName(level) {
    return RANKS[level] || `Seviye ${level}`; 
    }


    function createStatBarHTML(label, value, max = 20) {
        const percentage = (value / max) * 100;
        return `<div title="${label}: ${value}" style="font-size: 0.8em; margin-top:5px; text-align: left;">${label}<div class="stat-bar"><div class="stat-bar-fill" style="width: ${percentage}%;"></div></div></div>`;
    }

    function updateDynamicElements() {
    cashAmountEl.textContent = Math.floor(gameState.cash).toLocaleString();

    
    const unlockSlotBtn = document.getElementById('unlock-slot-btn');
    if (gameState.maxSlots >= 12) {
        unlockSlotBtn.textContent = 'Maksimum Slota Ulaşıldı';
        unlockSlotBtn.disabled = true;
    } else {
        unlockSlotBtn.textContent = `Yeni Slot Aç (${gameState.nextSlotCost.toLocaleString()} Cash)`;
        unlockSlotBtn.disabled = gameState.cash < gameState.nextSlotCost;
    }

    
    renderSlots();
    renderMaps();       
    renderShop();       
    renderWeaponShop();
}

    function renderAllUI() {
    updateDynamicElements();
    renderMaps();
    renderShop();
    renderWeaponShop();
}

   

function renderSlots() {
    const mercenarySlotsEl = document.getElementById('mercenary-slots');
    mercenarySlotsEl.innerHTML = '';
    gameState.slots.forEach((slot, index) => {
        const slotEl = document.createElement('div');
        slotEl.classList.add('card');

        if (slot.characterId) {
            const baseChar = CHARACTERS[slot.characterId];
            const currentLevelData = baseChar.levels[slot.level - 1];
            const weapon = WEAPONS[slot.weaponId];
            const rankName = getRankName(slot.level);
            
            let statusText;
            if (slot.isRecovering) { statusText = `<span class="recovering-status">İyileşiyor...</span>`; }
            else if (slot.onMission) {
                statusText = `${MAPS[slot.mapId].name} haritasında.`;
                if (slot.isReloading) { statusText += ` <span class="reloading-status">(Şarjör Dolduruyor!!)</span>`; }
            } else { statusText = 'Boşta Bekliyor'; }

            const maxHp = currentLevelData.stats.maxHp;
            const hpPercentage = (slot.currentHp / maxHp) * 100;
            const xpForNextLevel = currentLevelData.xpToNext;
            const xpPercentage = (xpForNextLevel === Infinity) ? 100 : (slot.xp / xpForNextLevel) * 100;

            slotEl.innerHTML = `
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
            
            // --- YENİ EKLENEN BÖLÜM ---
            const dismissBtn = document.createElement('button');
            dismissBtn.className = 'dismiss-btn'; // Stil için özel class
            dismissBtn.innerHTML = '&times;';     // HTML çarpı işareti ikonu
            dismissBtn.title = "Karakteri Kov";  // Mouse ile üzerine gelince açıklama çıkar
            dismissBtn.onclick = () => dismissMerc(index);
            actionsDiv.appendChild(dismissBtn);
            // --- EKLEME BİTTİ ---

            slotEl.appendChild(actionsDiv);
        } else {
            slotEl.innerHTML = `<h4>Boş Slot</h4><p>Dükkandan bir karakter satın al.</p>`;
        }
        mercenarySlotsEl.appendChild(slotEl);
    });
}

    function renderMaps() {
        mapsContainerEl.innerHTML = '';
        for (const mapId in MAPS) {
            const map = MAPS[mapId];
            const mapEl = document.createElement('div');
            mapEl.classList.add('card');
            const isUnlocked = gameState.unlockedMaps.includes(mapId);
            if (!isUnlocked) {
                mapEl.classList.add('locked');
            }
            mapEl.innerHTML = `<img src="${map.image}" alt="${map.name}" class="card-image"><h4>${map.name}</h4><p>Ödül: ${map.baseCashPerKill} Cash/Kill | XP: ${map.baseXpPerKill} XP/Kill</p>`;
            if (!isUnlocked) {
                const unlockBtn = document.createElement('button');
                unlockBtn.textContent = `Aç (${map.unlockCost.toLocaleString()} Cash)`;
                unlockBtn.disabled = gameState.cash < map.unlockCost;
                unlockBtn.onclick = () => unlockMap(mapId);
                mapEl.appendChild(unlockBtn);
            }
            mapsContainerEl.appendChild(mapEl);
        }
    }

    function renderShop() {
    characterShopEl.innerHTML = '';
    for (const charId in CHARACTERS) {
        const char = CHARACTERS[charId];
        const level1Data = char.levels[0];
        const charEl = document.createElement('div');
        charEl.classList.add('card');
        
        // --- DEĞİŞTİ: style="height: 180px;" kısıtlaması kaldırıldı ---
        charEl.innerHTML = `
            <img src="${level1Data.image.full}" alt="${char.name}" class="card-image">
            <h4>${char.name}</h4>
            <div class="stats" style="padding: 0 10px;">
                ${createStatBarHTML('Hasar Bonusu', level1Data.stats.damage)}
                ${createStatBarHTML('Max Can', level1Data.stats.maxHp, 200)}
                ${createStatBarHTML('Savunma', level1Data.stats.defense, 50)}
            </div>
            <p>Fiyat: ${char.cost.toLocaleString()} Cash</p>`;

        const buyBtn = document.createElement('button');
        buyBtn.textContent = 'Satın Al';
        buyBtn.disabled = gameState.cash < char.cost;
        buyBtn.onclick = () => buyCharacter(charId);
        charEl.appendChild(buyBtn);
        characterShopEl.appendChild(charEl);
    }
}

    function renderWeaponShop() {
        weaponShopEl.innerHTML = '';
        for (const weaponId in WEAPONS) {
            if (weaponId === 'k1') continue;
            const weapon = WEAPONS[weaponId];
            const cardEl = document.createElement('div');
            cardEl.className = 'card';
            cardEl.innerHTML = `
                <img src="${weapon.image}" alt="${weapon.name}" class="card-image">
                <h4>${weapon.name}</h4>
                <div class="stats" style="padding: 0 10px; font-size: 0.9em; text-align: left;">
                    <p><strong>Hasar:</strong> ${weapon.stats.damage}</p>
                    <p><strong>Atış Hızı:</strong> ${weapon.stats.fireRate}/s</p>
                    <p><strong>Şarjör:</strong> ${weapon.stats.magazine}</p>
                    <p><strong>Verim:</strong> ${weapon.stats.bulletsPerKill} mermi/kill</p>
                </div>
                <p>Fiyat: ${weapon.cost.toLocaleString()} Cash</p>`;
            const buyBtn = document.createElement('button');
            const isOwned = gameState.unlockedWeapons.includes(weaponId);
            if (isOwned) {
                buyBtn.textContent = 'Satın Alındı';
                buyBtn.disabled = true;
            } else {
                buyBtn.textContent = 'Satın Al';
                buyBtn.disabled = gameState.cash < weapon.cost;
                buyBtn.onclick = () => buyWeapon(weaponId);
            }
            cardEl.appendChild(buyBtn);
            weaponShopEl.appendChild(cardEl);
        }
    }

    // --- KAYIT SİSTEMİ FONKSİYONLARI (GELİŞTİRİLMİŞ) ---

/**
 * Mevcut oyun durumunu tarayıcının hafızasına kaydeder.
 */
function saveGame() {
    try {
        localStorage.setItem('noktaAtisiMangasiSave', JSON.stringify(gameState));
        // console.log("Oyun kaydedildi!"); // Test sırasında konsolu açarak kontrol edebilirsiniz.
    } catch (e) {
        console.error("HATA: Oyun kaydedilemedi!", e);
    }
}

/**
 * Kayıtlı oyun durumunu tarayıcının hafızasından yükler.
 */
function loadGame() {
    try {
        const savedData = localStorage.getItem('noktaAtisiMangasiSave');
        if (savedData === null || savedData === 'undefined') {
            console.log("Kayıtlı oyun bulunamadı, yeni oyun başlatılıyor.");
            return; // Kayıt yoksa işlemi bitir.
        }
        
        const loadedState = JSON.parse(savedData);
        // ÖNEMLİ: Yeni güncellemelerle eklenebilecek yeni özellikleri kaybetmemek için,
        // yüklenen veriyi mevcut gameState objesinin üzerine yazıyoruz.
        Object.assign(gameState, loadedState);
        console.log("Kayıtlı oyun başarıyla yüklendi!");

    } catch(e) {
        console.error("HATA: Kayıtlı veri yüklenemedi, muhtemelen bozuk. Oyun sıfırlanıyor.", e);
        resetGameData(false); // Onay sormadan sıfırla
    }
}

/**
 * Kayıtlı veriyi temizler ve sayfayı yenileyerek oyunu sıfırlar.
 * @param {boolean} askConfirmation - Kullanıcıya onay sorulup sorulmayacağı.
 */
function resetGameData(askConfirmation = true) {
    const confirmation = askConfirmation
        ? confirm("Tüm ilerlemenizi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!")
        : true;

    if (confirmation) {
        localStorage.removeItem('noktaAtisiMangasiSave');
        window.location.reload();
    }
}
// --- OYUNU BAŞLATMA ---

function initializeGame() {
    loadGame();       // 1. Önce kayıtlı veriyi yükle
    renderAllUI();    // 2. Yüklenmiş verilere göre arayüzü çiz
    
    // 3. Oyun döngülerini ve otomatik kaydı başlat
    setInterval(gameTick, 1000);
    setInterval(saveGame, 3000); // Kaydetme aralığını 3 saniyeye düşürdüm, daha güvenli.
}




    // --- OYUNCU AKSİYONLARI ---

    unlockSlotBtn.addEventListener('click', () => {
        if (gameState.maxSlots < 12 && gameState.cash >= gameState.nextSlotCost) {
            gameState.cash -= gameState.nextSlotCost;
            gameState.maxSlots++;
            gameState.nextSlotCost *= 2;
            gameState.slots.push({ characterId: null, level: 1, xp: 0, currentHp: 100, isRecovering: false, onMission: false, mapId: null, weaponId: 'k1', bulletsInMagazine: WEAPONS['k1'].stats.magazine, isReloading: false });
            renderAllUI();
        }
    });

    function buyCharacter(charId) {
        const character = CHARACTERS[charId];
        const emptySlotIndex = gameState.slots.findIndex(slot => slot.characterId === null);
        if (emptySlotIndex !== -1 && gameState.cash >= character.cost) {
            gameState.cash -= character.cost;
            const maxHp = character.levels[0].stats.maxHp;
            gameState.slots[emptySlotIndex] = {
                characterId: charId, level: 1, xp: 0,
                currentHp: maxHp, isRecovering: false,
                onMission: false, mapId: null, weaponId: 'k1',
                bulletsInMagazine: WEAPONS['k1'].stats.magazine, isReloading: false
            };
            renderAllUI();
        } else if (emptySlotIndex === -1) {
            alert("Tüm slotların dolu!");
        } else {
            alert("Yeterli paran yok!");
        }
    }

    function buyWeapon(weaponId) {
        const weapon = WEAPONS[weaponId];
        if (!gameState.unlockedWeapons.includes(weaponId) && gameState.cash >= weapon.cost) {
            gameState.cash -= weapon.cost;
            gameState.unlockedWeapons.push(weaponId);
            renderAllUI();
        }
    }

    function unlockMap(mapId) {
        const map = MAPS[mapId];
        if (!gameState.unlockedMaps.includes(mapId) && gameState.cash >= map.unlockCost) {
            gameState.cash -= map.unlockCost;
            gameState.unlockedMaps.push(mapId);
            renderAllUI();
        }
    }

    function recallMerc(slotIndex) {
        gameState.slots[slotIndex].onMission = false;
        gameState.slots[slotIndex].mapId = null;
        updateDynamicElements();
    }

    function sendMercToMap(slotIndex, mapId) {
        gameState.slots[slotIndex].onMission = true;
        gameState.slots[slotIndex].mapId = mapId;
        closeDeployModal();
        updateDynamicElements();
    }

    function equipWeapon(slotIndex, weaponId) {
        const slot = gameState.slots[slotIndex];
        const weapon = WEAPONS[weaponId];
        slot.weaponId = weaponId;
        slot.bulletsInMagazine = weapon.stats.magazine;
        slot.isReloading = false;
        closeEquipModal();
        updateDynamicElements();
    }

    /**
 * Belirtilen slottaki karakteri kovarak slotu boşaltır.
 * @param {number} slotIndex Kovulacak karakterin bulunduğu slotun indeksi.
 */
function dismissMerc(slotIndex) {
    const slot = gameState.slots[slotIndex];
    if (!slot.characterId) return; // Zaten boşsa bir şey yapma

    // Görevdeki karakterin kovulmasını engelle
    if (slot.onMission) {
        alert("Karakter görevdeyken kovulamaz! Önce üsse geri çağırmalısınız.");
        return;
    }

    // Kullanıcıdan onay al
    if (confirm(`Bu karakteri kovmak istediğinizden emin misiniz? Bu işlem geri alınamaz.`)) {
        // Slotu varsayılan boş haline geri döndür
        gameState.slots[slotIndex] = {
            characterId: null, level: 1, xp: 0, currentHp: 100,
            isRecovering: false, onMission: false, mapId: null,
            weaponId: 'k1', bulletsInMagazine: WEAPONS['k1'].stats.magazine, isReloading: false
        };
        // Arayüzü güncelle
        updateDynamicElements();
    }
}

    // --- MODAL FONKSİYONLARI ---

    function openDeployModal(slotIndex) {
        selectedSlotForDeploy = slotIndex;
        const slot = gameState.slots[slotIndex];
        const baseChar = CHARACTERS[slot.characterId];
        const rankName = getRankName(slot.level); // Rütbe adı burada alınıyor
        modalCharName.textContent = `${baseChar.name} - ${rankName}`;
        modalMapsList.innerHTML = '';
        gameState.unlockedMaps.forEach(mapId => {
            const map = MAPS[mapId];
            const mapBtn = document.createElement('button');
            const weapon = WEAPONS[slot.weaponId];
            const currentLevelData = baseChar.levels[slot.level - 1];
            const killsPerSec = (weapon.stats.fireRate / weapon.stats.bulletsPerKill);
            const totalDmg = currentLevelData.stats.damage + weapon.stats.damage;
            const earnings = killsPerSec * totalDmg * map.baseCashPerKill;
            mapBtn.textContent = `${map.name} (+${Math.round(earnings)}/s, -${map.damagePerSecond} HP/s)`;
            mapBtn.onclick = () => sendMercToMap(selectedSlotForDeploy, mapId);
            modalMapsList.appendChild(mapBtn);
        });
        deployModal.classList.remove('hidden');
    }

    function closeDeployModal() {
        deployModal.classList.add('hidden');
    }

    function openEquipModal(slotIndex) {
        selectedSlotForEquip = slotIndex;
        const slot = gameState.slots[slotIndex];
        const baseChar = CHARACTERS[slot.characterId];
        const rankName = getRankName(slot.level); // Rütbe adı burada alınıyor
        modalEquipCharName.textContent = `${baseChar.name} - ${rankName}`;
        modalWeaponsList.innerHTML = '';
        gameState.unlockedWeapons.forEach(weaponId => {
            const weapon = WEAPONS[weaponId];
            const weaponBtn = document.createElement('button');
            weaponBtn.textContent = `${weapon.name}`;
            if (slot.weaponId === weaponId) {
                weaponBtn.disabled = true;
                weaponBtn.textContent += ' (Kuşanıldı)';
            }
            weaponBtn.onclick = () => equipWeapon(selectedSlotForEquip, weaponId);
            modalWeaponsList.appendChild(weaponBtn);
        });
        equipWeaponModal.classList.remove('hidden');
    }

    function closeEquipModal() {
        equipWeaponModal.classList.add('hidden');
    }

    modalDeployCancelBtn.addEventListener('click', closeDeployModal);
    modalEquipCancelBtn.addEventListener('click', closeEquipModal);

    // --- OYUNU BAŞLAT ---
    renderAllUI();
});
