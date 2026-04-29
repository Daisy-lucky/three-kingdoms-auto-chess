/**
 * 三国自走棋 - 游戏核心逻辑
 * Three Kingdoms Auto Chess
 */

// ==================== 武将数据 ====================
const UNITS = {
    // 魏国
    caocao: { id: 'caocao', name: '曹操', faction: 'wei', class: ['warrior', 'mage'], cost: 5, hp: 1200, attack: 80, defense: 40, magicResist: 30, attackSpeed: 0.8, range: 1, skill: { name: '乱世奸雄', damage: 400, cost: 100 }, avatar: '👑' },
    simayi: { id: 'simayi', name: '司马懿', faction: 'wei', class: ['mage'], cost: 4, hp: 600, attack: 70, defense: 20, magicResist: 25, attackSpeed: 0.7, range: 4, skill: { name: '幽冥之火', damage: 350, cost: 80 }, avatar: '🦉' },
    xiahou: { id: 'xiahou', name: '夏侯惇', faction: 'wei', class: ['warrior', 'tank'], cost: 3, hp: 900, attack: 55, defense: 45, magicResist: 25, attackSpeed: 0.65, range: 1, skill: { name: '刚烈骨气', damage: 200, cost: 70 }, avatar: '👁️' },
    zhangliao: { id: 'zhangliao', name: '张辽', faction: 'wei', class: ['warrior', 'cavalry'], cost: 3, hp: 750, attack: 65, defense: 35, magicResist: 20, attackSpeed: 0.75, range: 1, skill: { name: '突袭', damage: 280, cost: 75 }, avatar: '⚔️' },
    xuchu: { id: 'xuchu', name: '许褚', faction: 'wei', class: ['warrior', 'tank'], cost: 2, hp: 700, attack: 45, defense: 35, magicResist: 20, attackSpeed: 0.6, range: 1, skill: { name: '裸衣血战', damage: 150, cost: 60 }, avatar: '🐯' },
    guojia: { id: 'guojia', name: '郭嘉', faction: 'wei', class: ['mage'], cost: 2, hp: 450, attack: 50, defense: 15, magicResist: 20, attackSpeed: 0.65, range: 4, skill: { name: '遗计', damage: 200, cost: 70 }, avatar: '📜' },
    dianwei: { id: 'dianwei', name: '典韦', faction: 'wei', class: ['warrior', 'assassin'], cost: 1, hp: 500, attack: 40, defense: 25, magicResist: 15, attackSpeed: 0.7, range: 1, skill: { name: '怒目', damage: 100, cost: 50 }, avatar: '👹' },
    lejin: { id: 'lejin', name: '乐进', faction: 'wei', class: ['archer'], cost: 1, hp: 400, attack: 35, defense: 15, magicResist: 15, attackSpeed: 0.75, range: 3, skill: { name: '先登', damage: 120, cost: 55 }, avatar: '🏹' },
    
    // 蜀国
    liubei: { id: 'liubei', name: '刘备', faction: 'shu', class: ['warrior', 'support'], cost: 4, hp: 800, attack: 50, defense: 30, magicResist: 25, attackSpeed: 0.65, range: 1, skill: { name: '仁德', damage: 0, cost: 80, heal: 300 }, avatar: '🎭' },
    guanyu: { id: 'guanyu', name: '关羽', faction: 'shu', class: ['warrior', 'cavalry'], cost: 4, hp: 950, attack: 75, defense: 35, magicResist: 25, attackSpeed: 0.7, range: 1, skill: { name: '青龙斩', damage: 380, cost: 90 }, avatar: '🐉' },
    zhangfei: { id: 'zhangfei', name: '张飞', faction: 'shu', class: ['warrior', 'assassin'], cost: 3, hp: 850, attack: 60, defense: 40, magicResist: 20, attackSpeed: 0.65, range: 1, skill: { name: '咆哮', damage: 250, cost: 75 }, avatar: '😠' },
    zhaoyun: { id: 'zhaoyun', name: '赵云', faction: 'shu', class: ['warrior', 'cavalry'], cost: 3, hp: 750, attack: 65, defense: 35, magicResist: 20, attackSpeed: 0.85, range: 1, skill: { name: '龙胆', damage: 280, cost: 70 }, avatar: '🐎' },
    zhugeliang: { id: 'zhugeliang', name: '诸葛亮', faction: 'shu', class: ['mage'], cost: 4, hp: 550, attack: 75, defense: 18, magicResist: 25, attackSpeed: 0.65, range: 4, skill: { name: '奇谋', damage: 400, cost: 85 }, avatar: '🪶' },
    machao: { id: 'machao', name: '马超', faction: 'shu', class: ['cavalry', 'assassin'], cost: 3, hp: 700, attack: 70, defense: 30, magicResist: 18, attackSpeed: 0.8, range: 1, skill: { name: '追击', damage: 260, cost: 70 }, avatar: '🐴' },
    huangzhong: { id: 'huangzhong', name: '黄忠', faction: 'shu', class: ['archer'], cost: 2, hp: 500, attack: 55, defense: 20, magicResist: 18, attackSpeed: 0.7, range: 4, skill: { name: '烈弓', damage: 220, cost: 65 }, avatar: '🎯' },
    pangtong: { id: 'pangtong', name: '庞统', faction: 'shu', class: ['mage'], cost: 2, hp: 480, attack: 55, defense: 15, magicResist: 20, attackSpeed: 0.65, range: 4, skill: { name: '连环', damage: 180, cost: 60 }, avatar: '🦅' },
    weiyan: { id: 'weiyan', name: '魏延', faction: 'shu', class: ['warrior'], cost: 1, hp: 520, attack: 38, defense: 28, magicResist: 15, attackSpeed: 0.65, range: 1, skill: { name: '狂骨', damage: 100, cost: 50 }, avatar: '😈' },
    guanping: { id: 'guanping', name: '关平', faction: 'shu', class: ['warrior'], cost: 1, hp: 480, attack: 35, defense: 25, magicResist: 15, attackSpeed: 0.65, range: 1, skill: { name: '龙吟', damage: 90, cost: 50 }, avatar: '🐲' },
    
    // 吴国
    sunquan: { id: 'sunquan', name: '孙权', faction: 'wu', class: ['mage', 'support'], cost: 4, hp: 650, attack: 55, defense: 25, magicResist: 28, attackSpeed: 0.7, range: 3, skill: { name: '制衡', damage: 0, cost: 75, buff: 'attackspeed' }, avatar: '👑' },
    zhouyu: { id: 'zhouyu', name: '周瑜', faction: 'wu', class: ['mage'], cost: 4, hp: 580, attack: 72, defense: 18, magicResist: 25, attackSpeed: 0.68, range: 4, skill: { name: '业火', damage: 380, cost: 85 }, avatar: '🔥' },
    luxun: { id: 'luxun', name: '陆逊', faction: 'wu', class: ['mage'], cost: 3, hp: 500, attack: 60, defense: 16, magicResist: 22, attackSpeed: 0.65, range: 4, skill: { name: '连营', damage: 280, cost: 70 }, avatar: '📚' },
    sunshangxiang: { id: 'sunshangxiang', name: '孙尚香', faction: 'wu', class: ['archer', 'assassin'], cost: 2, hp: 480, attack: 52, defense: 18, magicResist: 18, attackSpeed: 0.78, range: 3, skill: { name: '弓腰姬', damage: 200, cost: 60 }, avatar: '👸' },
    ganning: { id: 'ganning', name: '甘宁', faction: 'wu', class: ['assassin'], cost: 2, hp: 520, attack: 55, defense: 22, magicResist: 18, attackSpeed: 0.75, range: 1, skill: { name: '奇袭', damage: 180, cost: 60 }, avatar: '⚓' },
    taishici: { id: 'taishici', name: '太史慈', faction: 'wu', class: ['archer', 'warrior'], cost: 2, hp: 550, attack: 50, defense: 25, magicResist: 18, attackSpeed: 0.72, range: 3, skill: { name: '笃烈', damage: 160, cost: 55 }, avatar: '🏹' },
    zhoutai: { id: 'zhoutai', name: '周泰', faction: 'wu', class: ['warrior', 'tank'], cost: 1, hp: 550, attack: 35, defense: 30, magicResist: 18, attackSpeed: 0.6, range: 1, skill: { name: '不屈', damage: 80, cost: 50 }, avatar: '🛡️' },
    handang: { id: 'handang', name: '韩当', faction: 'wu', class: ['warrior'], cost: 1, hp: 470, attack: 36, defense: 24, magicResist: 15, attackSpeed: 0.68, range: 1, skill: { name: '骑射', damage: 90, cost: 50 }, avatar: '🐎' },
    
    // 群雄
    lvbu: { id: 'lvbu', name: '吕布', faction: 'qun', class: ['warrior', 'cavalry'], cost: 5, hp: 1100, attack: 90, defense: 38, magicResist: 28, attackSpeed: 0.75, range: 1, skill: { name: '无双', damage: 500, cost: 100, trueDamage: true }, avatar: '👿' },
    dongzhuo: { id: 'dongzhuo', name: '董卓', faction: 'qun', class: ['warrior', 'tank'], cost: 4, hp: 1100, attack: 60, defense: 45, magicResist: 30, attackSpeed: 0.55, range: 1, skill: { name: '暴虐', damage: 200, cost: 70, heal: 150 }, avatar: '👹' },
    diaochan: { id: 'diaochan', name: '貂蝉', faction: 'qun', class: ['assassin', 'mage'], cost: 3, hp: 500, attack: 58, defense: 18, magicResist: 22, attackSpeed: 0.75, range: 1, skill: { name: '闭月', damage: 250, cost: 75, charm: true }, avatar: '🌙' },
    yuanshao: { id: 'yuanshao', name: '袁绍', faction: 'qun', class: ['mage'], cost: 3, hp: 550, attack: 58, defense: 18, magicResist: 22, attackSpeed: 0.65, range: 4, skill: { name: '箭雨', damage: 260, cost: 70 }, avatar: '🏹' },
    huaxiong: { id: 'huaxiong', name: '华雄', faction: 'qun', class: ['warrior', 'tank'], cost: 2, hp: 680, attack: 48, defense: 38, magicResist: 20, attackSpeed: 0.58, range: 1, skill: { name: '威猛', damage: 150, cost: 55 }, avatar: '👺' },
    jiaxu: { id: 'jiaxu', name: '贾诩', faction: 'qun', class: ['mage'], cost: 2, hp: 460, attack: 52, defense: 15, magicResist: 20, attackSpeed: 0.65, range: 4, skill: { name: '乱武', damage: 180, cost: 65 }, avatar: '🐍' },
    zhangjiao: { id: 'zhangjiao', name: '张角', faction: 'qun', class: ['mage'], cost: 1, hp: 420, attack: 42, defense: 12, magicResist: 18, attackSpeed: 0.62, range: 4, skill: { name: '雷击', damage: 110, cost: 55 }, avatar: '⚡' },
    wenchou: { id: 'wenchou', name: '文丑', faction: 'qun', class: ['warrior'], cost: 1, hp: 500, attack: 40, defense: 26, magicResist: 15, attackSpeed: 0.63, range: 1, skill: { name: '猛击', damage: 100, cost: 50 }, avatar: '😤' },
};

// ==================== 装备数据 ====================
const EQUIPMENT = {
    // 基础装备
    sword: { id: 'sword', name: '长剑', icon: '🗡️', type: 'basic', stats: { attack: 15 } },
    bow: { id: 'bow', name: '短弓', icon: '🏹', type: 'basic', stats: { attackSpeed: 0.15 } },
    staff: { id: 'staff', name: '法杖', icon: '🔮', type: 'basic', stats: { ap: 20 } },
    armor: { id: 'armor', name: '护甲', icon: '🛡️', type: 'basic', stats: { defense: 25 } },
    cloak: { id: 'cloak', name: '斗篷', icon: '🧥', type: 'basic', stats: { magicResist: 25 } },
    belt: { id: 'belt', name: '腰带', icon: '🎗️', type: 'basic', stats: { hp: 150 } },
    glove: { id: 'glove', name: '拳套', icon: '🥊', type: 'basic', stats: { critRate: 0.1 } },
    gem: { id: 'gem', name: '宝石', icon: '💎', type: 'basic', stats: { critDamage: 0.2 } },
    
    // 合成装备
    green_dragon: { id: 'green_dragon', name: '青龙偃月刀', icon: '🐉', type: 'crafted', recipe: ['sword', 'sword'], stats: { attack: 40 }, effect: 'skill_crit' },
    halberd: { id: 'halberd', name: '方天画戟', icon: '⚔️', type: 'crafted', recipe: ['sword', 'bow'], stats: { attack: 25, attackSpeed: 0.25 } },
    snake_spear: { id: 'snake_spear', name: '丈八蛇矛', icon: '🔱', type: 'crafted', recipe: ['sword', 'glove'], stats: { attack: 30, critRate: 0.2 } },
    crossbow: { id: 'crossbow', name: '诸葛连弩', icon: '🏹', type: 'crafted', recipe: ['bow', 'bow'], stats: { attackSpeed: 0.5 }, effect: 'double_attack' },
    feather_fan: { id: 'feather_fan', name: '朱雀羽扇', icon: '🪶', type: 'crafted', recipe: ['staff', 'staff'], stats: { ap: 50 }, effect: 'range_plus' },
    bagua: { id: 'bagua', name: '八卦衣', icon: '☯️', type: 'crafted', recipe: ['staff', 'cloak'], stats: { ap: 30, magicResist: 30 } },
    ice_sword: { id: 'ice_sword', name: '寒冰剑', icon: '❄️', type: 'crafted', recipe: ['sword', 'staff'], stats: { attack: 20, ap: 25 }, effect: 'slow' },
    red_lotus: { id: 'red_lotus', name: '红莲铠', icon: '🔥', type: 'crafted', recipe: ['armor', 'armor'], stats: { defense: 60 }, effect: 'burn' },
    dragon_scale: { id: 'dragon_scale', name: '龙鳞甲', icon: '🐲', type: 'crafted', recipe: ['armor', 'belt'], stats: { defense: 35, hp: 200 } },
    kuangtu: { id: 'kuangtu', name: '狂徒铠甲', icon: '💪', type: 'crafted', recipe: ['belt', 'belt'], stats: { hp: 400 }, effect: 'regen' },
    endless: { id: 'endless', name: '无尽战刃', icon: '⚡', type: 'crafted', recipe: ['glove', 'gem'], stats: { critRate: 0.2, critDamage: 0.5 } },
    armor_piercer: { id: 'armor_piercer', name: '破甲弓', icon: '🏹', type: 'crafted', recipe: ['bow', 'glove'], stats: { attackSpeed: 0.25, critRate: 0.15 }, effect: 'armor_pierce' },
    huiyue: { id: 'huiyue', name: '辉月', icon: '🌙', type: 'crafted', recipe: ['staff', 'gem'], stats: { ap: 40, critDamage: 0.4 } },
    revive: { id: 'revive', name: '复活甲', icon: '💫', type: 'crafted', recipe: ['armor', 'glove'], stats: { defense: 35, critRate: 0.15 }, effect: 'revive' },
    lifesteal: { id: 'lifesteal', name: '吸血刀', icon: '🩸', type: 'crafted', recipe: ['sword', 'belt'], stats: { attack: 25, hp: 150 }, effect: 'lifesteal' },
};

// ==================== 羁绊数据 ====================
const BONDS = {
    // 阵营羁绊
    wei: { name: '魏国', icon: '🟦', counts: { 2: '魏国武将 +15% 护甲', 4: '魏国武将 +30% 护甲 +10% 吸血', 6: '魏国武将 +50% 护甲 +20% 吸血' } },
    shu: { name: '蜀国', icon: '🟩', counts: { 2: '蜀国武将 +15% 攻击力', 4: '蜀国武将 +30% 攻击力 +15% 暴击', 6: '蜀国武将 +50% 攻击力 +25% 暴击' } },
    wu: { name: '吴国', icon: '🟥', counts: { 2: '吴国武将 +15% 攻速', 4: '吴国武将 +30% 攻速 +15% 暴击伤害', 6: '吴国武将 +50% 攻速 +30% 暴击伤害' } },
    qun: { name: '群雄', icon: '⬜', counts: { 1: '群雄武将技能伤害 +10%', 3: '群雄武将技能伤害 +25%', 5: '群雄武将技能伤害 +40% + 真实伤害' } },
    
    // 职业羁绊
    warrior: { name: '武将', icon: '⚔️', counts: { 2: '武将 +10% 攻击力', 4: '武将 +25% 攻击力 +10% 吸血', 6: '武将 +40% 攻击力 +20% 吸血' } },
    mage: { name: '谋士', icon: '📜', counts: { 2: '谋士 +15% 法术强度', 4: '谋士 +30% 法术强度', 6: '谋士 +50% 法术强度' } },
    assassin: { name: '刺客', icon: '🗡️', counts: { 2: '刺客 +20% 暴击率', 4: '刺客 +40% 暴击率 +30% 暴击伤害', 6: '刺客 +60% 暴击率 +50% 暴击伤害' } },
    archer: { name: '弓手', icon: '🏹', counts: { 2: '弓手 +20% 攻速', 4: '弓手 +40% 攻速', 6: '弓手 +60% 攻速' } },
    cavalry: { name: '骑兵', icon: '🐎', counts: { 2: '骑兵冲锋距离 +1, +15% 伤害', 4: '骑兵冲锋距离 +2, +30% 伤害', 6: '骑兵冲锋距离 +3, +50% 伤害' } },
    support: { name: '辅助', icon: '💚', counts: { 2: '辅助技能效果 +20%', 4: '辅助技能效果 +40%' } },
    tank: { name: '坦克', icon: '🛡️', counts: { 2: '坦克 +20% 最大生命值', 4: '坦克 +40% 最大生命值', 6: '坦克 +60% 最大生命值' } },
    
    // 特殊羁绊
    wuhu: { name: '五虎上将', icon: '🐯', units: ['guanyu', 'zhangfei', 'zhaoyun', 'machao', 'huangzhong'], count: 5, effect: '全员 +50% 攻击力 +30% 攻速' },
    taoyuan: { name: '桃园结义', icon: '🍑', units: ['liubei', 'guanyu', 'zhangfei'], count: 3, effect: '每 5 秒群体治疗 20% 血量' },
};

// ==================== 游戏主类 ====================
class Game {
    constructor() {
        this.canvas = document.getElementById('chess-board');
        this.ctx = this.canvas.getContext('2d');
        
        this.gridSize = 70;
        this.cols = 8;
        this.rows = 8;
        this.hexSize = 35; // 八边形半径
        
        this.canvas.width = this.cols * this.gridSize + this.gridSize;
        this.canvas.height = this.rows * this.gridSize + this.gridSize;
        
        this.resetGame();
        this.setupEventListeners();
        this.render();
        this.dragUnit = null;
    }
    
    resetGame() {
        this.playerLevel = 1;
        this.playerExp = 0;
        this.playerHp = 100;
        this.gold = 50;
        this.round = 1;
        this.phase = 'prepare';
        
        this.shop = [];
        this.boardUnits = [];
        this.benchUnits = [];
        this.equipment = [];
        this.selectedUnit = null;
        this.selectedEquip = null;
        
        this.bonds = {
            wei: 0, shu: 0, wu: 0, qun: 0,
            warrior: 0, mage: 0, assassin: 0, archer: 0,
            cavalry: 0, support: 0, tank: 0
        };
        
        this.initShop();
    }
    
    initShop() {
        this.shop = [];
        for (let i = 0; i < 5; i++) {
            this.shop.push(this.randomUnit());
        }
        this.renderShop();
    }
    
    randomUnit() {
        const rand = Math.random() * 100;
        let cost;
        if (rand < 30) cost = 1;
        else if (rand < 70) cost = 2;
        else if (rand < 90) cost = 3;
        else if (rand < 98) cost = 4;
        else cost = 5;
        
        const units = Object.values(UNITS).filter(u => u.cost === cost);
        const unit = units[Math.floor(Math.random() * units.length)];
        return { ...unit, star: 1, uid: Date.now() + Math.random() };
    }
    
    setupEventListeners() {
        this.canvas.addEventListener('mousedown', (e) => this.handleBoardDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleBoardMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleBoardUp(e));
        this.canvas.addEventListener('mouseleave', () => this.handleBoardUp());
    }
    
    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        
        // 八边形网格坐标计算
        const col = Math.floor(mx / this.gridSize);
        const row = Math.floor(my / this.gridSize);
        
        return { x: Math.max(0, Math.min(this.cols - 1, col)), y: Math.max(0, Math.min(this.rows - 1, row)) };
    }
    
    handleBoardDown(e) {
        const pos = this.getMousePos(e);
        
        // 检查是否点击了已有单位
        const clickedUnit = this.boardUnits.find(u => u.gridX === pos.x && u.gridY === pos.y);
        if (clickedUnit) {
            this.dragUnit = clickedUnit;
            this.dragOffset = { x: pos.x - clickedUnit.gridX, y: pos.y - clickedUnit.gridY };
            this.isDragging = true;
        } else if (this.selectedBenchUnit) {
            // 从候补区选择拖拽
            this.dragUnit = this.selectedBenchUnit;
            this.isDragging = true;
        }
        
        this.mousePos = pos;
        this.render();
    }
    
    handleBoardMove(e) {
        if (this.isDragging) {
            this.mousePos = this.getMousePos(e);
            this.render();
        }
    }
    
    handleBoardUp(e) {
        if (this.isDragging && this.dragUnit && this.mousePos) {
            const pos = this.mousePos;
            
            // 检查是否在我方区域（下方 4 行）
            if (pos.y >= 4) {
                // 检查位置是否已有单位
                const occupied = this.boardUnits.find(u => u.gridX === pos.x && u.gridY === pos.y && u.uid !== this.dragUnit.uid);
                if (!occupied) {
                    // 检查人口限制
                    if (this.boardUnits.length >= this.playerLevel && !this.dragUnit.gridXInit) {
                        this.showMessage('人口已达上限！', 'error');
                    } else {
                        this.dragUnit.gridX = pos.x;
                        this.dragUnit.gridY = pos.y;
                        
                        // 如果是从候补区拖拽的（还未上阵）
                        if (!this.dragUnit.gridXInit) {
                            this.dragUnit.gridXInit = true;
                            this.boardUnits.push(this.dragUnit);
                            this.benchUnits = this.benchUnits.filter(u => u.uid !== this.dragUnit.uid);
                            this.showMessage(`${this.dragUnit.name} 上阵！`, 'info');
                        }
                        
                        this.calcBonds();
                        this.updateUI();
                        this.render();
                    }
                } else {
                    this.showMessage('该位置已有单位！', 'error');
                }
            } else {
                this.showMessage('只能放置在我方区域（绿色）！', 'error');
            }
        }
        
        this.isDragging = false;
        this.dragUnit = null;
        this.selectedBenchUnit = null;
        this.render();
    }
    
    buyUnit(index) {
        const unit = this.shop[index];
        if (!unit || this.gold < unit.cost) return;
        
        this.gold -= unit.cost;
        
        // 检查是否有相同武将
        const existing = this.benchUnits.find(u => u.id === unit.id && u.star === unit.star);
        if (existing && existing.star < 3) {
            // 升星
            existing.star++;
            if (existing.star >= 3) {
                this.showMessage(`${existing.name} 三星了！`, 'gold');
            }
        } else {
            const newUnit = { ...unit, uid: Date.now() + Math.random(), gridX: -1, gridY: -1 };
            this.benchUnits.push(newUnit);
        }
        
        this.shop[index] = this.randomUnit();
        this.updateUI();
        this.renderShop();
        this.calcBonds();
    }
    
    refreshShop() {
        if (this.gold < 2) return;
        this.gold -= 2;
        this.initShop();
        this.updateUI();
    }
    
    buyExp() {
        if (this.gold < 4) return;
        this.gold -= 4;
        this.playerExp += 10;
        this.checkLevelUp();
        this.updateUI();
    }
    
    checkLevelUp() {
        const expNeeded = this.playerLevel * 10;
        if (this.playerExp >= expNeeded && this.playerLevel < 9) {
            this.playerLevel++;
            this.playerExp = 0;
            this.showMessage(`升级到 ${this.playerLevel} 级！`, 'gold');
        }
    }
    
    placeUnit(x, y) {
        if (!this.selectedUnit) return;
        
        // 检查位置是否有效（我方区域）
        if (y < 4) {
            this.showMessage('只能放置在我方区域！', 'error');
            return;
        }
        
        // 检查位置是否已有单位
        const occupied = this.boardUnits.find(u => u.gridX === x && u.gridY === y);
        if (occupied) {
            this.showMessage('该位置已有单位！', 'error');
            return;
        }
        
        // 检查人口限制
        if (this.boardUnits.length >= this.playerLevel) {
            this.showMessage('人口已达上限！', 'error');
            return;
        }
        
        this.selectedUnit.gridX = x;
        this.selectedUnit.gridY = y;
        this.boardUnits.push(this.selectedUnit);
        this.benchUnits = this.benchUnits.filter(u => u.uid !== this.selectedUnit.uid);
        this.selectedUnit = null;
        
        this.calcBonds();
        this.render();
        this.updateUI();
    }
    
    removeUnit(uid) {
        const unit = this.boardUnits.find(u => u.uid === uid);
        if (!unit) return;
        
        this.boardUnits = this.boardUnits.filter(u => u.uid !== uid);
        delete unit.gridXInit;
        this.benchUnits.push(unit);
        
        this.calcBonds();
        this.render();
        this.updateUI();
    }
    
    selectBenchUnit(uid) {
        const unit = this.benchUnits.find(u => u.uid === uid);
        if (!unit) return;
        
        this.selectedBenchUnit = unit;
        this.showMessage(`点击棋盘放置 ${unit.name}`, 'info');
    }
    
    calcBonds() {
        // 重置羁绊计数
        this.bonds = {
            wei: 0, shu: 0, wu: 0, qun: 0,
            warrior: 0, mage: 0, assassin: 0, archer: 0,
            cavalry: 0, support: 0, tank: 0
        };
        
        // 统计场上武将
        for (let unit of this.boardUnits) {
            const data = UNITS[unit.id];
            if (!data) continue;
            
            // 阵营
            this.bonds[data.faction]++;
            
            // 职业
            for (let cls of data.class) {
                this.bonds[cls]++;
            }
        }
        
        this.renderBonds();
    }
    
    renderBonds() {
        const container = document.getElementById('bond-display');
        let html = '';
        
        for (let [key, count] of Object.entries(this.bonds)) {
            if (count === 0) continue;
            const bond = BONDS[key];
            if (!bond) continue;
            
            const thresholds = Object.keys(bond.counts).map(Number).sort((a, b) => b - a);
            let active = false;
            let activeThreshold = 0;
            
            for (let t of thresholds) {
                if (count >= t) {
                    active = true;
                    activeThreshold = t;
                    break;
                }
            }
            
            html += `<div class="bond-tag ${active ? 'bond-active' : ''}">
                ${bond.icon} ${bond.name} ${count}/${activeThreshold}
            </div>`;
        }
        
        container.innerHTML = html;
    }
    
    startBattle() {
        if (this.boardUnits.length === 0) {
            this.showMessage('请先上阵武将！', 'error');
            return;
        }
        
        this.phase = 'battle';
        this.showMessage('战斗开始！', 'info');
        
        // 模拟战斗
        setTimeout(() => this.resolveBattle(), 2000);
    }
    
    resolveBattle() {
        // 简化战斗计算
        const myPower = this.calcTeamPower();
        const enemyPower = this.calcEnemyPower();
        
        const win = myPower > enemyPower * (0.8 + Math.random() * 0.4);
        
        if (win) {
            this.showMessage('胜利！', 'victory');
            this.gold += 5;
        } else {
            this.showMessage('失败！', 'defeat');
            this.playerHp -= 10;
        }
        
        // 回合结束
        setTimeout(() => this.endRound(), 1500);
    }
    
    calcTeamPower() {
        let power = 0;
        for (let unit of this.boardUnits) {
            const data = UNITS[unit.id];
            power += (data.hp + data.attack * 2 + data.defense) * unit.star;
        }
        return power;
    }
    
    calcEnemyPower() {
        return this.round * 150 + Math.random() * 200;
    }
    
    endRound() {
        this.round++;
        this.phase = 'prepare';
        
        // 回合奖励
        this.gold += 5;
        this.gold += Math.min(5, Math.floor(this.gold / 10));
        
        // 野怪回合
        if (this.round % 5 === 0) {
            this.gold += 3;
            this.equipment.push(this.randomBasicEquip());
            this.showMessage('野怪回合！获得装备！', 'gold');
        }
        
        document.getElementById('round-info').textContent = `第 ${this.round} 回合 - 准备阶段`;
        this.updateUI();
        this.initShop();
    }
    
    randomBasicEquip() {
        const basics = Object.values(EQUIPMENT).filter(e => e.type === 'basic');
        return basics[Math.floor(Math.random() * basics.length)];
    }
    
    startGame() {
        document.getElementById('start-screen').classList.add('hidden');
        this.resetGame();
        this.updateUI();
        this.render();
        this.showMessage('欢迎来到三国自走棋！', 'info');
    }
    
    updateUI() {
        document.getElementById('player-level').textContent = this.playerLevel;
        document.getElementById('player-hp').textContent = this.playerHp;
        document.getElementById('round-num').textContent = this.round;
        document.getElementById('gold-count').textContent = this.gold;
        document.getElementById('unit-count').textContent = this.boardUnits.length;
        document.getElementById('max-units').textContent = this.playerLevel;
        
        this.renderBench();
    }
    
    renderShop() {
        const container = document.getElementById('shop');
        container.innerHTML = this.shop.map((unit, i) => `
            <div class="shop-unit" onclick="game.buyUnit(${i})">
                <div class="unit-avatar cost-${unit.cost}">
                    ${unit.avatar}
                    ${unit.star > 1 ? `<span class="unit-star">${'⭐'.repeat(unit.star - 1)}</span>` : ''}
                </div>
                <div class="unit-name">${unit.name}</div>
                <div class="unit-cost">${unit.cost}💰</div>
            </div>
        `).join('');
    }
    
    renderBench() {
        // 渲染场上武将
        const container = document.getElementById('board-units');
        container.innerHTML = this.boardUnits.map(unit => `
            <div class="shop-unit" onclick="game.removeUnit('${unit.uid}')" style="width:50px;cursor:pointer;" title="点击移除">
                <div class="unit-avatar cost-${unit.cost}" style="width:40px;height:40px;font-size:20px;">
                    ${unit.avatar}
                </div>
            </div>
        `).join('');
        
        // 渲染候补区武将
        const benchContainer = document.getElementById('bench-units');
        if (benchContainer) {
            benchContainer.innerHTML = this.benchUnits.map(unit => `
                <div class="shop-unit" onclick="game.selectBenchUnit('${unit.uid}')" style="width:55px;cursor:grab;" title="点击后拖拽到棋盘">
                    <div class="unit-avatar cost-${unit.cost}" style="width:45px;height:45px;font-size:24px;">
                        ${unit.avatar}
                        ${unit.star > 1 ? `<span class="unit-star">${'⭐'.repeat(unit.star - 1)}</span>` : ''}
                    </div>
                    <div style="font-size:10px;color:#ffd700;">${unit.name}</div>
                </div>
            `).join('');
        }
    }
    
    render() {
        const ctx = this.ctx;
        const gs = this.gridSize;
        const hexR = this.hexSize;
        
        // 清空画布
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制八边形网格
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cx = col * gs + gs / 2;
                const cy = row * gs + gs / 2;
                this.drawOctagon(cx, cy, hexR, '#ddd', '#ffffff');
            }
        }
        
        // 绘制我方区域标记
        for (let row = 4; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cx = col * gs + gs / 2;
                const cy = row * gs + gs / 2;
                this.drawOctagon(cx, cy, hexR - 2, 'rgba(76, 175, 80, 0.2)', 'rgba(76, 175, 80, 0.1)');
            }
        }
        
        // 绘制敌方区域标记
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cx = col * gs + gs / 2;
                const cy = row * gs + gs / 2;
                this.drawOctagon(cx, cy, hexR - 2, 'rgba(244, 67, 54, 0.2)', 'rgba(244, 67, 54, 0.1)');
            }
        }
        
        // 绘制棋盘上的单位
        for (let unit of this.boardUnits) {
            this.drawUnit(unit.gridX, unit.gridY, unit);
        }
        
        // 绘制拖拽预览
        if (this.isDragging && this.dragUnit && this.mousePos) {
            ctx.globalAlpha = 0.7;
            this.drawUnit(this.mousePos.x, this.mousePos.y, this.dragUnit);
            ctx.globalAlpha = 1;
        }
    }
    
    drawOctagon(cx, cy, r, strokeColor, fillColor) {
        const ctx = this.ctx;
        const angles = [0, 45, 90, 135, 180, 225, 270, 315];
        
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = angles[i] * Math.PI / 180;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        
        if (fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fill();
        }
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    
    drawUnit(x, y, unit) {
        const ctx = this.ctx;
        const gs = this.gridSize;
        const cx = x * gs + gs / 2;
        const cy = y * gs + gs / 2;
        const hexR = this.hexSize - 3;
        
        // 绘制八边形背景
        const angles = [0, 45, 90, 135, 180, 225, 270, 315];
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = angles[i] * Math.PI / 180;
            const px = cx + hexR * Math.cos(angle);
            const py = cy + hexR * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        
        // 渐变背景
        const gradient = ctx.createRadialGradient(cx, cy, 5, cx, cy, hexR);
        gradient.addColorStop(0, '#fff');
        gradient.addColorStop(1, '#e8e8e8');
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // 绘制单位头像
        ctx.font = '36px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(unit.avatar, cx, cy);
        
        // 绘制星级
        if (unit.star > 1) {
            ctx.font = '10px Arial';
            ctx.fillStyle = '#ffd700';
            ctx.fillText('⭐'.repeat(unit.star - 1), cx, cy - 22);
        }
        
        // 绘制阵营边框
        ctx.strokeStyle = this.getFactionColor(unit.faction);
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = angles[i] * Math.PI / 180;
            const px = cx + (hexR - 2) * Math.cos(angle);
            const py = cy + (hexR - 2) * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
    }
    
    getFactionColor(faction) {
        const colors = { wei: '#4a90d9', shu: '#5cb85c', wu: '#d9534f', qun: '#f0ad4e' };
        return colors[faction] || '#666';
    }
    
    showMessage(text, type = 'info') {
        const el = document.getElementById('battle-info');
        el.textContent = text;
        el.className = `show ${type}`;
        setTimeout(() => el.classList.remove('show'), 2000);
    }
    
    showEquipPanel() {
        document.getElementById('equip-panel').classList.add('show');
        this.renderEquipPanel();
    }
    
    hideEquipPanel() {
        document.getElementById('equip-panel').classList.remove('show');
    }
    
    renderEquipPanel() {
        const basicGrid = document.getElementById('basic-equip-grid');
        const craftGrid = document.getElementById('craft-equip-grid');
        
        basicGrid.innerHTML = Object.values(EQUIPMENT)
            .filter(e => e.type === 'basic')
            .map(e => `<div class="equipment-item">${e.icon}</div>`)
            .join('');
        
        craftGrid.innerHTML = Object.values(EQUIPMENT)
            .filter(e => e.type === 'crafted')
            .map(e => {
                const mat1 = EQUIPMENT[e.recipe[0]];
                const mat2 = EQUIPMENT[e.recipe[1]];
                return `<div class="equipment-item" title="${mat1.name}+${mat2.name}">${e.icon}</div>`;
            })
            .join('');
    }
    
    lockUnits() {
        this.showMessage('阵容已锁定', 'info');
    }
    
    saveGame() {
        const data = {
            playerLevel: this.playerLevel,
            playerExp: this.playerExp,
            playerHp: this.playerHp,
            gold: this.gold,
            round: this.round,
            boardUnits: this.boardUnits,
            benchUnits: this.benchUnits,
            equipment: this.equipment,
        };
        localStorage.setItem('threeKingdomsChessSave', JSON.stringify(data));
        this.showMessage('游戏已保存', 'info');
    }
    
    showHelp() {
        alert(`三国自走棋 - 游戏帮助

🎮 基本玩法：
1. 在商店购买武将
2. 将武将放置到棋盘上（下方绿色区域）
3. 搭配阵营和职业羁绊
4. 点击"开始战斗"进行对战

💰 经济系统：
- 每回合基础收入：5 金币
- 胜利奖励：+2 金币
- 利息：每 10 金币 +1 金币（最多 5）
- 刷新商店：2 金币
- 购买经验：4 金币

⭐ 武将升星：
- 3 个相同武将 = 2 星
- 3 个 2 星 = 3 星（共 9 个）

🔗 羁绊系统：
- 阵营：魏蜀吴群
- 职业：武将、谋士、刺客、弓手、骑兵、辅助、坦克
- 特殊：五虎上将、桃园结义

🎒 装备系统：
- 野怪回合（5、10、15...）掉落装备
- 两个基础装备可合成高级装备

🏆 胜利条件：
- 击败所有敌人
- 存活到最后`);
    }
}

// 启动游戏
const game = new Game();
