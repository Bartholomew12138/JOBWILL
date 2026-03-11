// 职业倾向测试 - 优化版本
// 题目扩展到50道，增强区分度，添加场景化描述

console.log('=== script.js 开始加载 ===');
console.log('当前时间:', new Date().toLocaleTimeString());

// 题目分类
const QUESTION_TYPES = {
    CORE: 'core',           // 核心特征题 - 权重1.5
    KEY: 'key',             // 关键特征题 - 权重1.2
    BOUNDARY: 'boundary',    // 边界区分题 - 权重1.3
    EXTREME: 'extreme',     // 极端偏好题 - 权重1.4
    CONSISTENCY: 'consistency'  // 一致性检验题 - 权重0.5（用于验证）
};

console.log('QUESTION_TYPES 定义完成');

// 题目权重配置
const WEIGHTS = {
    [QUESTION_TYPES.CORE]: 1.5,
    [QUESTION_TYPES.KEY]: 1.2,
    [QUESTION_TYPES.BOUNDARY]: 1.3,
    [QUESTION_TYPES.EXTREME]: 1.4,
    [QUESTION_TYPES.CONSISTENCY]: 0.5
};

// 测试题目
const questions = [
    // ===== 核心特征题（风险、稳定、WLB）- 12题 =====
    {
        id: 1,
        type: QUESTION_TYPES.CORE,
        category: 'risk',
        text: "场景：你刚加入一家公司3个月，突然发现公司经营出现严重困难，可能发不出下个月工资。你会？",
        options: [
            { 
                text: "立即离职，寻找新的机会", 
                scores: { entrepreneur: 3, private: 5, foreign: 5, soe: 2, civil: 0 } 
            },
            { 
                text: "观望情况，同时寻找备选", 
                scores: { entrepreneur: 2, private: 4, foreign: 4, soe: 4, civil: 2 } 
            },
            { 
                text: "与公司共渡难关，相信会好转", 
                scores: { entrepreneur: 1, private: 2, foreign: 2, soe: 7, civil: 9 } 
            }
        ]
    },
    {
        id: 2,
        type: QUESTION_TYPES.CORE,
        category: 'stability',
        text: "场景：两个工作机会：A公司年薪30万但每年有15%裁员率；B公司年薪18万但几乎不裁员。你选择？",
        options: [
            { 
                text: "毫不犹豫选A，高薪值得冒险", 
                scores: { entrepreneur: 9, private: 7, foreign: 5, soe: 1, civil: 0 } 
            },
            { 
                text: "犹豫后选A，但会持续关注公司状况", 
                scores: { entrepreneur: 6, private: 6, foreign: 5, soe: 3, civil: 1 } 
            },
            { 
                text: "坚定选B，稳定更重要", 
                scores: { entrepreneur: 0, private: 2, foreign: 4, soe: 8, civil: 9 } 
            }
        ]
    },
    {
        id: 3,
        type: QUESTION_TYPES.CORE,
        category: 'wlb',
        text: "场景：你的领导说，这个项目很紧急，接下来一个月需要每天工作到晚上11点，项目完成后可以补休一周。你会？",
        options: [
            { 
                text: "欣然接受，为了项目可以牺牲", 
                scores: { entrepreneur: 9, private: 8, foreign: 3, soe: 2, civil: 0 } 
            },
            { 
                text: "勉强接受，但会表达不满", 
                scores: { entrepreneur: 5, private: 6, foreign: 5, soe: 4, civil: 2 } 
            },
            { 
                text: "坚决拒绝，这是不合理的安排", 
                scores: { entrepreneur: 1, private: 1, foreign: 7, soe: 7, civil: 9 } 
            }
        ]
    },
    {
        id: 4,
        type: QUESTION_TYPES.CORE,
        category: 'risk',
        text: "场景：你手头有30万创业资金，同时有一个年薪18万的稳定工作机会。你会？",
        options: [
            {
                text: "立即创业，趁年轻搏一搏",
                scores: { entrepreneur: 9, private: 3, foreign: 2, soe: 0, civil: 0 }
            },
            {
                text: "先工作积累经验，3年内再创业",
                scores: { entrepreneur: 5, private: 5, foreign: 4, soe: 1, civil: 0 }
            },
            {
                text: "选择稳定工作，创业风险太大",
                scores: { entrepreneur: 0, private: 3, foreign: 4, soe: 7, civil: 9 }
            }
        ]
    },
    {
        id: 5,
        type: QUESTION_TYPES.CORE,
        category: 'wlb',
        text: "场景：周末你正在陪家人，突然收到紧急工作消息需要处理。你会？",
        options: [
            { 
                text: "立即放下一切处理工作", 
                scores: { entrepreneur: 9, private: 8, foreign: 2, soe: 1, civil: 0 } 
            },
            { 
                text: "先处理，但心里不爽", 
                scores: { entrepreneur: 5, private: 6, foreign: 5, soe: 3, civil: 1 } 
            },
            { 
                text: "告知工作时间处理，现在陪伴家人", 
                scores: { entrepreneur: 0, private: 1, foreign: 8, soe: 8, civil: 9 } 
            }
        ]
    },
    {
        id: 6,
        type: QUESTION_TYPES.CORE,
        category: 'stability',
        text: "场景：你已经在现在的公司工作了5年，收入稳定但增长缓慢。猎头给你开涨薪50%的offer，但新公司口碑一般。你会？",
        options: [
            { 
                text: "立即跳槽，涨薪50%太诱人了", 
                scores: { entrepreneur: 6, private: 8, foreign: 6, soe: 2, civil: 0 } 
            },
            { 
                text: "认真考虑新公司，如果靠谱就跳", 
                scores: { entrepreneur: 4, private: 7, foreign: 7, soe: 4, civil: 1 } 
            },
            { 
                text: "留在原公司，稳定更重要", 
                scores: { entrepreneur: 0, private: 1, foreign: 4, soe: 8, civil: 9 } 
            }
        ]
    },
    {
        id: 7,
        type: QUESTION_TYPES.CORE,
        category: 'risk',
        text: "场景：你的朋友邀请你加入他的创业团队，不拿工资只给股权，但你觉得项目前景不错。你会？",
        options: [
            { 
                text: "毫不犹豫加入，一起创业", 
                scores: { entrepreneur: 9, private: 3, foreign: 1, soe: 0, civil: 0 } 
            },
            { 
                text: "考虑用业余时间参与，保留本职", 
                scores: { entrepreneur: 5, private: 5, foreign: 3, soe: 1, civil: 0 } 
            },
            { 
                text: "婉拒，太不靠谱了", 
                scores: { entrepreneur: 0, private: 1, foreign: 3, soe: 7, civil: 9 } 
            }
        ]
    },
    {
        id: 8,
        type: QUESTION_TYPES.CORE,
        category: 'wlb',
        text: "场景：公司要推行996工作制（早9晚9，每周6天），但承诺薪资上涨30%。你会？",
        options: [
            { 
                text: "接受，涨薪30%值得", 
                scores: { entrepreneur: 7, private: 9, foreign: 2, soe: 0, civil: 0 } 
            },
            { 
                text: "考虑接受，但有压力", 
                scores: { entrepreneur: 3, private: 6, foreign: 4, soe: 1, civil: 0 } 
            },
            { 
                text: "拒绝，再高薪也不值得", 
                scores: { entrepreneur: 0, private: 0, foreign: 8, soe: 8, civil: 9 } 
            }
        ]
    },
    {
        id: 9,
        type: QUESTION_TYPES.CORE,
        category: 'stability',
        text: "场景：行业内传出裁员消息，你所在的公司也可能受影响。你会？",
        options: [
            { 
                text: "立即更新简历，准备跳槽", 
                scores: { entrepreneur: 5, private: 7, foreign: 6, soe: 1, civil: 0 } 
            },
            { 
                text: "观察情况，同时做准备", 
                scores: { entrepreneur: 3, private: 5, foreign: 6, soe: 4, civil: 2 } 
            },
            { 
                text: "相信公司，不会主动行动", 
                scores: { entrepreneur: 0, private: 1, foreign: 3, soe: 8, civil: 9 } 
            }
        ]
    },
    {
        id: 10,
        type: QUESTION_TYPES.CORE,
        category: 'wlb',
        text: "场景：工作日晚上10点，你还有重要工作没完成，但已经计划好和家人聚餐。你会？",
        options: [
            { 
                text: "取消聚餐，完成工作", 
                scores: { entrepreneur: 9, private: 8, foreign: 2, soe: 1, civil: 0 } 
            },
            { 
                text: "加班到10点半，再匆忙赶去聚餐", 
                scores: { entrepreneur: 5, private: 6, foreign: 5, soe: 3, civil: 1 } 
            },
            { 
                text: "先去聚餐，工作明天再说", 
                scores: { entrepreneur: 0, private: 1, foreign: 8, soe: 8, civil: 9 } 
            }
        ]
    },
    {
        id: 11,
        type: QUESTION_TYPES.CORE,
        category: 'risk',
        text: "场景：你的上司突然辞职，公司高层动荡。你会？",
        options: [
            { 
                text: "立即离职，船要沉了", 
                scores: { entrepreneur: 5, private: 7, foreign: 5, soe: 0, civil: 0 } 
            },
            { 
                text: "观察情况，寻找机会", 
                scores: { entrepreneur: 3, private: 6, foreign: 6, soe: 3, civil: 1 } 
            },
            { 
                text: "继续工作，相信公司会好转", 
                scores: { entrepreneur: 0, private: 1, foreign: 4, soe: 8, civil: 9 } 
            }
        ]
    },
    {
        id: 12,
        type: QUESTION_TYPES.CORE,
        category: 'stability',
        text: "场景：你有两个offer：一家知名外企（薪资25万，可能裁员）vs 一家国企（薪资18万，几乎不裁员）。你会？",
        options: [
            { 
                text: "选外企，平台和成长更重要", 
                scores: { entrepreneur: 4, private: 7, foreign: 8, soe: 1, civil: 0 } 
            },
            { 
                text: "犹豫后选外企，但担心风险", 
                scores: { entrepreneur: 2, private: 5, foreign: 6, soe: 4, civil: 1 } 
            },
            { 
                text: "选国企，稳定压倒一切", 
                scores: { entrepreneur: 0, private: 1, foreign: 3, soe: 9, civil: 9 } 
            }
        ]
    },

    // ===== 关键特征题（创新、规则、自主性）- 10题 =====
    {
        id: 13,
        type: QUESTION_TYPES.KEY,
        category: 'innovation',
        text: "场景：你在工作中发现了一个能提升效率的新方法，但这需要改变现有流程。你会？",
        options: [
            { 
                text: "立即实施，结果最重要", 
                scores: { entrepreneur: 9, private: 7, foreign: 3, soe: 1, civil: 0 } 
            },
            { 
                text: "先汇报，得到批准后再改", 
                scores: { entrepreneur: 3, private: 5, foreign: 7, soe: 5, civil: 3 } 
            },
            { 
                text: "按现有流程做，别惹麻烦", 
                scores: { entrepreneur: 0, private: 1, foreign: 4, soe: 9, civil: 9 } 
            }
        ]
    },
    {
        id: 14,
        type: QUESTION_TYPES.KEY,
        category: 'rule_following',
        text: "场景：公司规定必须严格按照流程办事，但你发现流程明显低效。你会？",
        options: [
            { 
                text: "不管流程，效率优先", 
                scores: { entrepreneur: 9, private: 6, foreign: 2, soe: 0, civil: 0 } 
            },
            { 
                text: "尝试优化流程，同时汇报", 
                scores: { entrepreneur: 5, private: 6, foreign: 7, soe: 4, civil: 2 } 
            },
            { 
                text: "严格按流程，不越雷池", 
                scores: { entrepreneur: 0, private: 1, foreign: 6, soe: 9, civil: 9 } 
            }
        ]
    },
    {
        id: 15,
        type: QUESTION_TYPES.KEY,
        category: 'autonomy',
        text: "场景：你的工作方式与上级的想法不一致，但你觉得你的方式更好。你会？",
        options: [
            { 
                text: "坚持己见，按自己的方式做", 
                scores: { entrepreneur: 9, private: 5, foreign: 2, soe: 0, civil: 0 } 
            },
            { 
                text: "沟通后折中，部分按自己方式", 
                scores: { entrepreneur: 5, private: 7, foreign: 7, soe: 3, civil: 1 } 
            },
            { 
                text: "完全听从上级安排", 
                scores: { entrepreneur: 0, private: 1, foreign: 4, soe: 9, civil: 9 } 
            }
        ]
    },
    {
        id: 16,
        type: QUESTION_TYPES.KEY,
        category: 'innovation',
        text: "场景：会议上大家都在讨论一个新项目，你想到了一个与众不同的创新想法。你会？",
        options: [
            { 
                text: "立即提出，大胆创新", 
                scores: { entrepreneur: 9, private: 7, foreign: 4, soe: 1, civil: 0 } 
            },
            { 
                text: "会后单独找领导沟通", 
                scores: { entrepreneur: 4, private: 6, foreign: 7, soe: 4, civil: 2 } 
            },
            { 
                text: "保持沉默，跟随主流", 
                scores: { entrepreneur: 0, private: 2, foreign: 4, soe: 8, civil: 9 } 
            }
        ]
    },
    {
        id: 17,
        type: QUESTION_TYPES.KEY,
        category: 'rule_following',
        text: "场景：上级要求你执行一个你认为明显不合理的决策。你会？",
        options: [
            { 
                text: "拒绝执行，坚持正确做法", 
                scores: { entrepreneur: 7, private: 4, foreign: 2, soe: 0, civil: 0 } 
            },
            { 
                text: "提出建议，但最终还是执行", 
                scores: { entrepreneur: 3, private: 7, foreign: 7, soe: 5, civil: 3 } 
            },
            { 
                text: "无条件执行，服从命令", 
                scores: { entrepreneur: 0, private: 1, foreign: 5, soe: 9, civil: 9 } 
            }
        ]
    },
    {
        id: 18,
        type: QUESTION_TYPES.KEY,
        category: 'autonomy',
        text: "场景：公司给你安排了一个任务，但没有明确的方法指导。你会？",
        options: [
            { 
                text: "太好了，完全自主发挥", 
                scores: { entrepreneur: 9, private: 7, foreign: 3, soe: 1, civil: 0 } 
            },
            { 
                text: "先请教同事，再自己决定", 
                scores: { entrepreneur: 4, private: 6, foreign: 7, soe: 5, civil: 2 } 
            },
            { 
                text: "请求上级明确指示", 
                scores: { entrepreneur: 0, private: 1, foreign: 5, soe: 9, civil: 9 } 
            }
        ]
    },
    {
        id: 19,
        type: QUESTION_TYPES.KEY,
        category: 'innovation',
        text: "场景：你发现了一个行业的新趋势，但这与你当前的工作方向不完全一致。你会？",
        options: [
            { 
                text: "立即转向，抓住新机会", 
                scores: { entrepreneur: 9, private: 6, foreign: 3, soe: 0, civil: 0 } 
            },
            { 
                text: "业余时间研究，不放弃现有工作", 
                scores: { entrepreneur: 5, private: 6, foreign: 6, soe: 3, civil: 1 } 
            },
            { 
                text: "专注当前工作，不分散精力", 
                scores: { entrepreneur: 0, private: 2, foreign: 5, soe: 8, civil: 9 } 
            }
        ]
    },
    {
        id: 20,
        type: QUESTION_TYPES.KEY,
        category: 'rule_following',
        text: "场景：公司有严格的考勤制度，迟到一分钟都要扣钱。你会？",
        options: [
            { 
                text: "太压抑，无法忍受", 
                scores: { entrepreneur: 9, private: 5, foreign: 2, soe: 0, civil: 0 } 
            },
            { 
                text: "不舒服，但会尽量遵守", 
                scores: { entrepreneur: 3, private: 6, foreign: 6, soe: 4, civil: 2 } 
            },
            { 
                text: "完全可以接受，很正常", 
                scores: { entrepreneur: 0, private: 2, foreign: 7, soe: 9, civil: 9 } 
            }
        ]
    },
    {
        id: 21,
        type: QUESTION_TYPES.KEY,
        category: 'autonomy',
        text: "场景：你的工作成果被上级据为己有，没有提到你的贡献。你会？",
        options: [
            { 
                text: "立即向上级申诉，维护权益", 
                scores: { entrepreneur: 9, private: 5, foreign: 3, soe: 0, civil: 0 } 
            },
            { 
                text: "私下沟通，希望以后能提", 
                scores: { entrepreneur: 4, private: 6, foreign: 6, soe: 4, civil: 2 } 
            },
            { 
                text: "忍气吞声，算了", 
                scores: { entrepreneur: 0, private: 1, foreign: 5, soe: 8, civil: 9 } 
            }
        ]
    },
    {
        id: 22,
        type: QUESTION_TYPES.KEY,
        category: 'innovation',
        text: "场景：你有机会参加一个行业前沿技术培训，但这需要占用周末时间且自费。你会？",
        options: [
            { 
                text: "立即参加，学习新技术", 
                scores: { entrepreneur: 8, private: 7, foreign: 6, soe: 2, civil: 1 } 
            },
            { 
                text: "考虑后参加，但觉得贵", 
                scores: { entrepreneur: 4, private: 5, foreign: 6, soe: 4, civil: 2 } 
            },
            { 
                text: "不参加，公司应该提供培训", 
                scores: { entrepreneur: 0, private: 1, foreign: 4, soe: 8, civil: 9 } 
            }
        ]
    },

    // ===== 边界区分题（私企vs外企、国企vs公务员）- 10题 =====
    {
        id: 23,
        type: QUESTION_TYPES.BOUNDARY,
        category: 'boundary_private_foreign',
        text: "场景：你更倾向于哪种公司文化？",
        options: [
            { 
                text: "996文化，快速迭代，高薪高压", 
                scores: { entrepreneur: 7, private: 9, foreign: 1, soe: 0, civil: 0 } 
            },
            { 
                text: "欧美文化，WLB优先，流程规范", 
                scores: { entrepreneur: 2, private: 1, foreign: 9, soe: 2, civil: 1 } 
            },
            { 
                text: "国企文化，稳定有序，按部就班", 
                scores: { entrepreneur: 0, private: 0, foreign: 2, soe: 9, civil: 8 } 
            }
        ]
    },
    {
        id: 24,
        type: QUESTION_TYPES.BOUNDARY,
        category: 'boundary_private_foreign',
        text: "场景：外企A公司（25万，965）vs 私企B公司（35万，996）。你选择？",
        options: [
            { 
                text: "B公司，多赚10万值得", 
                scores: { entrepreneur: 6, private: 9, foreign: 1, soe: 0, civil: 0 } 
            },
            { 
                text: "A公司，WLB更重要", 
                scores: { entrepreneur: 1, private: 0, foreign: 9, soe: 2, civil: 1 } 
            },
            { 
                text: "都不选，找平衡的工作", 
                scores: { entrepreneur: 2, private: 2, foreign: 4, soe: 7, civil: 8 } 
            }
        ]
    },
    {
        id: 25,
        type: QUESTION_TYPES.BOUNDARY,
        category: 'boundary_soe_civil',
        text: "场景：你更偏好哪种晋升机制？",
        options: [
            { 
                text: "绩效导向，能力说了算，可能快速晋升", 
                scores: { entrepreneur: 6, private: 8, foreign: 7, soe: 3, civil: 0 } 
            },
            { 
                text: "职级体系，按资历晋升，稳定但慢", 
                scores: { entrepreneur: 0, private: 1, foreign: 3, soe: 7, civil: 9 } 
            },
            { 
                text: "选调生通道，优秀干部培养", 
                scores: { entrepreneur: 0, private: 0, foreign: 2, soe: 6, civil: 8 } 
            }
        ]
    },
    {
        id: 26,
        type: QUESTION_TYPES.BOUNDARY,
        category: 'boundary_soe_civil',
        text: "场景：央企总部（22万，在京有编制）vs 公务员（16万，在京有编制）。你选择？",
        options: [
            { 
                text: "央企，多6万 worth", 
                scores: { entrepreneur: 3, private: 7, foreign: 5, soe: 9, civil: 2 } 
            },
            { 
                text: "公务员，地位更高更稳定", 
                scores: { entrepreneur: 0, private: 0, foreign: 2, soe: 3, civil: 9 } 
            },
            { 
                text: "都不选，回地方发展", 
                scores: { entrepreneur: 2, private: 2, foreign: 3, soe: 7, civil: 7 } 
            }
        ]
    },
    {
        id: 27,
        type: QUESTION_TYPES.BOUNDARY,
        category: 'boundary_foreign_soe',
        text: "场景：外企驻华总部（28万，可能有裁员）vs 国企二级公司（20万，不裁员）。你选择？",
        options: [
            { 
                text: "外企，平台和薪资更重要", 
                scores: { entrepreneur: 4, private: 7, foreign: 9, soe: 0, civil: 0 } 
            },
            { 
                text: "国企，稳定第一", 
                scores: { entrepreneur: 0, private: 1, foreign: 2, soe: 9, civil: 7 } 
            },
            { 
                text: "看其他机会", 
                scores: { entrepreneur: 3, private: 3, foreign: 4, soe: 5, civil: 5 } 
            }
        ]
    },
    {
        id: 28,
        type: QUESTION_TYPES.BOUNDARY,
        category: 'boundary_private_startup',
        text: "场景：创业公司（给你5%股权，月薪1万）vs 成熟私企（月薪3万，无股权）。你选择？",
        options: [
            { 
                text: "创业公司，赌一把", 
                scores: { entrepreneur: 9, private: 4, foreign: 1, soe: 0, civil: 0 } 
            },
            { 
                text: "成熟私企，现金为王", 
                scores: { entrepreneur: 2, private: 9, foreign: 5, soe: 1, civil: 0 } 
            },
            { 
                text: "都不选，找更稳的工作", 
                scores: { entrepreneur: 0, private: 0, foreign: 3, soe: 7, civil: 9 } 
            }
        ]
    },
    {
        id: 29,
        type: QUESTION_TYPES.BOUNDARY,
        category: 'boundary_work_style',
        text: "场景：你更喜欢哪种工作方式？",
        options: [
            { 
                text: "自主决策，快速试错，结果导向", 
                scores: { entrepreneur: 9, private: 7, foreign: 3, soe: 0, civil: 0 } 
            },
            { 
                text: "团队协作，按流程走，过程规范", 
                scores: { entrepreneur: 1, private: 5, foreign: 9, soe: 5, civil: 3 } 
            },
            { 
                text: "上级决策，严格执行，层级分明", 
                scores: { entrepreneur: 0, private: 1, foreign: 3, soe: 9, civil: 9 } 
            }
        ]
    },
    {
        id: 30,
        type: QUESTION_TYPES.BOUNDARY,
        category: 'boundary_company_size',
        text: "场景：大公司（稳定但晋升慢）vs 小公司（快速成长但风险高）。你选择？",
        options: [
            { 
                text: "小公司，快速成长", 
                scores: { entrepreneur: 9, private: 6, foreign: 2, soe: 0, civil: 0 } 
            },
            { 
                text: "大公司，稳定发展", 
                scores: { entrepreneur: 0, private: 4, foreign: 8, soe: 9, civil: 8 } 
            },
            { 
                text: "中型公司，平衡发展", 
                scores: { entrepreneur: 3, private: 8, foreign: 7, soe: 5, civil: 3 } 
            }
        ]
    },
    {
        id: 31,
        type: QUESTION_TYPES.BOUNDARY,
        category: 'boundary_training',
        text: "场景：你更看重哪种培训发展？",
        options: [
            { 
                text: "在实践中学习，快速成长", 
                scores: { entrepreneur: 8, private: 8, foreign: 5, soe: 2, civil: 0 } 
            },
            { 
                text: "系统化培训体系，循序渐进", 
                scores: { entrepreneur: 1, private: 3, foreign: 9, soe: 7, civil: 5 } 
            },
            { 
                text: "党校/干部培训，政治理论学习", 
                scores: { entrepreneur: 0, private: 0, foreign: 1, soe: 7, civil: 9 } 
            }
        ]
    },
    {
        id: 32,
        type: QUESTION_TYPES.BOUNDARY,
        category: 'boundary_compensation',
        text: "场景：你更偏好哪种薪酬结构？",
        options: [
            { 
                text: "底薪+高额年终奖，浮动大", 
                scores: { entrepreneur: 8, private: 9, foreign: 4, soe: 1, civil: 0 } 
            },
            { 
                text: "稳定薪资+中等奖金，有保障", 
                scores: { entrepreneur: 1, private: 2, foreign: 8, soe: 8, civil: 7 } 
            },
            { 
                text: "固定薪资为主，变化极小", 
                scores: { entrepreneur: 0, private: 0, foreign: 5, soe: 9, civil: 9 } 
            }
        ]
    },

    // ===== 极端偏好测试题 - 8题 =====
    {
        id: 33,
        type: QUESTION_TYPES.EXTREME,
        category: 'extreme_salary',
        text: "场景：年薪30万但每天工作12小时 vs 年薪15万但每天工作8小时。你选？",
        options: [
            {
                text: "30万，值得",
                scores: { entrepreneur: 9, private: 9, foreign: 3, soe: 0, civil: 0 }
            },
            {
                text: "犹豫后选30万",
                scores: { entrepreneur: 4, private: 6, foreign: 5, soe: 2, civil: 0 }
            },
            {
                text: "15万，时间更值钱",
                scores: { entrepreneur: 0, private: 0, foreign: 7, soe: 8, civil: 9 }
            }
        ]
    },
    {
        id: 34,
        type: QUESTION_TYPES.EXTREME,
        category: 'extreme_risk',
        text: "场景：100万创业资金，但90%可能3年内全部赔光 vs 30万稳定工作，确保收入。你选？",
        options: [
            { 
                text: "创业，搏一把", 
                scores: { entrepreneur: 9, private: 2, foreign: 1, soe: 0, civil: 0 } 
            },
            { 
                text: "考虑创业，但犹豫", 
                scores: { entrepreneur: 4, private: 4, foreign: 3, soe: 1, civil: 0 } 
            },
            { 
                text: "稳定工作，绝不冒险", 
                scores: { entrepreneur: 0, private: 1, foreign: 4, soe: 8, civil: 9 } 
            }
        ]
    },
    {
        id: 35,
        type: QUESTION_TYPES.EXTREME,
        category: 'extreme_wlb',
        text: "场景：可以完全自由安排工作时间，但年收入会降30%。你愿意吗？",
        options: [
            { 
                text: "完全愿意，自由最重要", 
                scores: { entrepreneur: 8, private: 4, foreign: 5, soe: 1, civil: 2 } 
            },
            { 
                text: "考虑接受", 
                scores: { entrepreneur: 4, private: 3, foreign: 6, soe: 4, civil: 4 } 
            },
            { 
                text: "不愿意，收入更重要", 
                scores: { entrepreneur: 0, private: 5, foreign: 5, soe: 8, civil: 8 } 
            }
        ]
    },
    {
        id: 36,
        type: QUESTION_TYPES.EXTREME,
        category: 'extreme_stability',
        text: "场景：一份工作可以干到退休，几乎不涨薪 vs 一份工作可能3年换一次，但每次涨薪50%。你选？",
        options: [
            { 
                text: "频繁跳槽，追求高薪", 
                scores: { entrepreneur: 5, private: 8, foreign: 5, soe: 0, civil: 0 } 
            },
            { 
                text: "考虑跳槽，但担心不稳定", 
                scores: { entrepreneur: 2, private: 5, foreign: 6, soe: 3, civil: 1 } 
            },
            { 
                text: "稳定到底，不换工作", 
                scores: { entrepreneur: 0, private: 0, foreign: 4, soe: 9, civil: 9 } 
            }
        ]
    },
    {
        id: 37,
        type: QUESTION_TYPES.EXTREME,
        category: 'extreme_autonomy',
        text: "场景：你的工作完全不受任何约束，可以自主决定一切，但你需要对结果完全负责（包括失败赔偿）。你接受吗？",
        options: [
            { 
                text: "完全接受，自主权最爽", 
                scores: { entrepreneur: 9, private: 5, foreign: 1, soe: 0, civil: 0 } 
            },
            { 
                text: "考虑接受", 
                scores: { entrepreneur: 5, private: 4, foreign: 3, soe: 1, civil: 0 } 
            },
            { 
                text: "不接受，风险太大", 
                scores: { entrepreneur: 0, private: 0, foreign: 5, soe: 8, civil: 9 } 
            }
        ]
    },
    {
        id: 38,
        type: QUESTION_TYPES.EXTREME,
        category: 'extreme_innovation',
        text: "场景：一个创新想法有30%成功可能带来巨大财富，70%失败会损失1年积蓄。你会尝试吗？",
        options: [
            { 
                text: "立即尝试，高风险高回报", 
                scores: { entrepreneur: 9, private: 6, foreign: 2, soe: 0, civil: 0 } 
            },
            { 
                text: "考虑尝试", 
                scores: { entrepreneur: 4, private: 5, foreign: 4, soe: 2, civil: 0 } 
            },
            { 
                text: "不会，太冒险", 
                scores: { entrepreneur: 0, private: 0, foreign: 5, soe: 8, civil: 9 } 
            }
        ]
    },
    {
        id: 39,
        type: QUESTION_TYPES.EXTREME,
        category: 'extreme_location',
        text: "场景：北上广深年薪30万 vs 家乡小县城年薪12万但买房无压力。你选择？",
        options: [
            {
                text: "一线城市，机会更多",
                scores: { entrepreneur: 6, private: 8, foreign: 8, soe: 3, civil: 0 }
            },
            {
                text: "犹豫后选一线城市",
                scores: { entrepreneur: 3, private: 5, foreign: 6, soe: 4, civil: 1 }
            },
            {
                text: "家乡，生活品质更重要",
                scores: { entrepreneur: 0, private: 0, foreign: 2, soe: 8, civil: 9 }
            }
        ]
    },
    {
        id: 40,
        type: QUESTION_TYPES.EXTREME,
        category: 'extreme_workload',
        text: "场景：连续加班1个月完成任务后奖励10万，但期间几乎无休息。你愿意吗？",
        options: [
            { 
                text: "愿意，值得", 
                scores: { entrepreneur: 8, private: 9, foreign: 1, soe: 0, civil: 0 } 
            },
            { 
                text: "考虑愿意", 
                scores: { entrepreneur: 4, private: 5, foreign: 4, soe: 2, civil: 0 } 
            },
            { 
                text: "不愿意，健康更重要", 
                scores: { entrepreneur: 0, private: 0, foreign: 7, soe: 8, civil: 9 } 
            }
        ]
    },

    // ===== 一致性检验题 - 10题 =====
    {
        id: 41,
        type: QUESTION_TYPES.CONSISTENCY,
        category: 'consistency_risk',
        text: "你对自己的风险承受能力评价是？",
        options: [
            { 
                text: "极低，保守型", 
                scores: { entrepreneur: 0, private: 1, foreign: 2, soe: 8, civil: 9 } 
            },
            { 
                text: "中等，稳健型", 
                scores: { entrepreneur: 3, private: 4, foreign: 6, soe: 5, civil: 4 } 
            },
            { 
                text: "极高，进取型", 
                scores: { entrepreneur: 9, private: 7, foreign: 3, soe: 0, civil: 0 } 
            }
        ]
    },
    {
        id: 42,
        type: QUESTION_TYPES.CONSISTENCY,
        category: 'consistency_stability',
        text: "你对工作稳定性的重视程度（0-10分）？",
        options: [
            { 
                text: "3分以下，不太重视", 
                scores: { entrepreneur: 8, private: 5, foreign: 2, soe: 0, civil: 0 } 
            },
            { 
                text: "4-7分，比较重视", 
                scores: { entrepreneur: 3, private: 6, foreign: 6, soe: 5, civil: 3 } 
            },
            { 
                text: "8分以上，极度重视", 
                scores: { entrepreneur: 0, private: 0, foreign: 4, soe: 9, civil: 9 } 
            }
        ]
    },
    {
        id: 43,
        type: QUESTION_TYPES.CONSISTENCY,
        category: 'consistency_wlb',
        text: "你认为工作和生活哪个更重要？",
        options: [
            { 
                text: "工作远重要于生活", 
                scores: { entrepreneur: 9, private: 8, foreign: 2, soe: 0, civil: 0 } 
            },
            { 
                text: "两者平衡", 
                scores: { entrepreneur: 3, private: 5, foreign: 7, soe: 5, civil: 3 } 
            },
            { 
                text: "生活远重要于工作", 
                scores: { entrepreneur: 0, private: 0, foreign: 7, soe: 8, civil: 9 } 
            }
        ]
    },
    {
        id: 44,
        type: QUESTION_TYPES.CONSISTENCY,
        category: 'consistency_innovation',
        text: "你喜欢的工作方式是？",
        options: [
            { 
                text: "创新突破，不断尝试新事物", 
                scores: { entrepreneur: 9, private: 7, foreign: 3, soe: 0, civil: 0 } 
            },
            { 
                text: "适度创新，但不冒险", 
                scores: { entrepreneur: 3, private: 6, foreign: 7, soe: 4, civil: 1 } 
            },
            { 
                text: "按部就班，执行既定流程", 
                scores: { entrepreneur: 0, private: 0, foreign: 4, soe: 9, civil: 9 } 
            }
        ]
    },
    {
        id: 45,
        type: QUESTION_TYPES.CONSISTENCY,
        category: 'consistency_autonomy',
        text: "你希望有多大的工作自主权？",
        options: [
            { 
                text: "完全自主，自己决定一切", 
                scores: { entrepreneur: 9, private: 6, foreign: 2, soe: 0, civil: 0 } 
            },
            { 
                text: "部分自主，请示后执行", 
                scores: { entrepreneur: 3, private: 7, foreign: 7, soe: 5, civil: 2 } 
            },
            { 
                text: "基本不自主，严格按指令", 
                scores: { entrepreneur: 0, private: 0, foreign: 4, soe: 9, civil: 9 } 
            }
        ]
    },
    {
        id: 46,
        type: QUESTION_TYPES.CONSISTENCY,
        category: 'consistency_salary',
        text: "你对薪资期望是？（起薪）",
        options: [
            {
                text: "30万以上，追求高薪",
                scores: { entrepreneur: 7, private: 8, foreign: 6, soe: 1, civil: 0 }
            },
            {
                text: "18-30万，中等期望",
                scores: { entrepreneur: 3, private: 6, foreign: 7, soe: 5, civil: 2 }
            },
            {
                text: "18万以下，稳定为主",
                scores: { entrepreneur: 0, private: 1, foreign: 4, soe: 8, civil: 9 }
            }
        ]
    },
    {
        id: 47,
        type: QUESTION_TYPES.CONSISTENCY,
        category: 'consistency_promotion',
        text: "你期望的晋升速度是？",
        options: [
            { 
                text: "快速，1-2年升一级", 
                scores: { entrepreneur: 8, private: 8, foreign: 5, soe: 0, civil: 0 } 
            },
            { 
                text: "中等，3-5年升一级", 
                scores: { entrepreneur: 3, private: 6, foreign: 7, soe: 4, civil: 1 } 
            },
            { 
                text: "慢速，5年以上升一级", 
                scores: { entrepreneur: 0, private: 0, foreign: 4, soe: 8, civil: 9 } 
            }
        ]
    },
    {
        id: 48,
        type: QUESTION_TYPES.CONSISTENCY,
        category: 'consistency_international',
        text: "你对国际化工作的态度？",
        options: [
            { 
                text: "非常向往，希望有海外经历", 
                scores: { entrepreneur: 4, private: 4, foreign: 9, soe: 0, civil: 0 } 
            },
            { 
                text: "一般，有机会可以考虑", 
                scores: { entrepreneur: 2, private: 5, foreign: 6, soe: 3, civil: 1 } 
            },
            { 
                text: "不感兴趣，希望在国内", 
                scores: { entrepreneur: 2, private: 3, foreign: 2, soe: 7, civil: 9 } 
            }
        ]
    },
    {
        id: 49,
        type: QUESTION_TYPES.CONSISTENCY,
        category: 'consistency_social',
        text: "你更看重工作的？",
        options: [
            { 
                text: "个人发展和收益", 
                scores: { entrepreneur: 8, private: 7, foreign: 4, soe: 1, civil: 0 } 
            },
            { 
                text: "两者平衡", 
                scores: { entrepreneur: 3, private: 5, foreign: 6, soe: 4, civil: 2 } 
            },
            { 
                text: "社会贡献和公共价值", 
                scores: { entrepreneur: 0, private: 0, foreign: 3, soe: 7, civil: 9 } 
            }
        ]
    },
    {
        id: 50,
        type: QUESTION_TYPES.CONSISTENCY,
        category: 'consistency_overall',
        text: "总结一下,你最看重工作的哪个方面?",
        options: [
            { 
                text: "高薪和快速成长", 
                scores: { entrepreneur: 7, private: 8, foreign: 5, soe: 0, civil: 0 } 
            },
            { 
                text: "稳定和生活平衡", 
                scores: { entrepreneur: 0, private: 0, foreign: 5, soe: 8, civil: 9 } 
            },
            { 
                text: "国际化和规范环境", 
                scores: { entrepreneur: 1, private: 1, foreign: 9, soe: 3, civil: 0 } 
            }
        ]
    }
];

// 职业信息
const careerInfo = {
    entrepreneur: {
        name: "创业",
        icon: "🚀",
        color: "#f59e0b",
        description: "适合具有强烈创业精神和创新能力的你",
        features: {
            salary: "起薪差异极大，成功后收益无上限",
            risk: "高风险，失败率超过90%",
            wlb: "初期几乎无WLB，需要全身心投入",
            promotion: "自主决定，成长速度完全取决于个人能力",
            stability: "极不稳定，需要强大的抗压能力"
        },
        subcategories: [
            {
                title: "高科技创业",
                description: "适合技术创新能力强、有技术背景的毕业生，如AI、新能源、生物医药等领域"
            },
            {
                title: "商业模式创新",
                description: "适合善于发现市场痛点、有商业敏感度的毕业生，如新消费、共享经济等"
            },
            {
                title: "小微创业",
                description: "适合资金有限、想从小做起的毕业生，如自媒体、电商、服务业等"
            }
        ]
    },
    private: {
        name: "国内私企",
        icon: "💼",
        color: "#3b82f6",
        description: "适合追求快速成长、接受一定挑战的你",
        features: {
            salary: "起薪较高，互联网大厂起薪可达18-35万/年",
            risk: "中等风险，裁员风险取决于公司经营状况",
            wlb: "普遍较差，头部企业加班较多",
            promotion: "晋升速度快，能力导向，但竞争激烈",
            stability: "稳定性一般，跳槽机会多"
        },
        subcategories: [
            {
                title: "互联网大厂",
                description: "如阿里、腾讯、字节等，起薪高但加班强度大，适合抗压能力强、追求高薪的毕业生"
            },
            {
                title: "中型成长公司",
                description: "如独角兽企业，介于大厂和创业公司之间，平衡了风险与收益"
            },
            {
                title: "传统私企",
                description: "如制造业、服务业等，薪资适中，稳定性较好，适合追求稳定的毕业生"
            }
        ]
    },
    foreign: {
        name: "外企",
        icon: "🌍",
        color: "#8b5cf6",
        description: "适合追求国际化视野和工作生活平衡的你",
        features: {
            salary: "起薪较高，福利待遇好，整体竞争力强",
            risk: "较低风险，裁员相对规范",
            wlb: "较好，普遍遵守劳动法规，加班较少",
            promotion: "晋升稳定但相对缓慢，看重长期发展",
            stability: "较高，文化成熟，流程规范"
        },
        subcategories: [
            {
                title: "欧美外企",
                description: "如微软、谷歌等，WLB最好，文化最开放，适合追求生活品质的毕业生"
            },
            {
                title: "日韩外企",
                description: "如丰田、三星等，注重长期雇佣，等级森严，适合喜欢稳定环境的毕业生"
            },
            {
                title: "港台企业",
                description: "文化介于中西方之间，节奏较快但相对规范，适合适应能力强的毕业生"
            }
        ]
    },
    soe: {
        name: "国央企",
        icon: "🏢",
        color: "#10b981",
        description: "适合追求稳定和长期发展的你",
        features: {
            salary: "起薪中等，但福利待遇好，综合竞争力强",
            risk: "极低风险，几乎不会裁员",
            wlb: "较好，加班相对较少，节假日保障好",
            promotion: "晋升稳定但缓慢，重视资历和学历",
            stability: "极高，被称为'铁饭碗'"
        },
        subcategories: [
            {
                title: "央企总部",
                description: "如中石油、国家电网等总部，竞争激烈，起薪高，平台大"
            },
            {
                title: "地方国企",
                description: "如地方城投、能源企业等，竞争较小，更适合本地发展"
            },
            {
                title: "政策性金融",
                description: "如银行、券商等国企岗位，金融属性强，起薪较高"
            }
        ]
    },
    civil: {
        name: "公务员",
        icon: "🎓",
        color: "#ef4444",
        description: "适合追求稳定和社会地位的你",
        features: {
            salary: "起薪较低，但福利待遇完善，综合收入稳定",
            risk: "极低风险，职业保障性最强",
            wlb: "最好，严格按时下班，节假日保障充分",
            promotion: "晋升稳定但最慢，有明确的职级体系",
            stability: "最高，被称为'金饭碗'"
        },
        subcategories: [
            {
                title: "选调生",
                description: "重点高校优秀毕业生，培养方向为领导干部，发展前景最好"
            },
            {
                title: "中央机关",
                description: "如部委、部委直属机构，平台最高，但竞争最激烈"
            },
            {
                title: "地方公务员",
                description: "如省市县乡各级机关，竞争相对较小，更适合本地发展"
            }
        ]
    }
};

// 互斥职业对配置
const EXCLUSIVE_PAIRS = [
    ['entrepreneur', 'civil'],
    ['entrepreneur', 'soe'],
    ['civil', 'private']
];

// 相似度阈值配置
const SIMILARITY_THRESHOLD = 15; // 当两个职业差距小于15%时触发

// 当前状态
let currentQuestion = 0;
let answers = [];
let originalAnswers = []; // 保存原始答案用于一致性检验
let additionalQuestions = []; // 动态插入的额外问题

// 用户信息
let userInfo = {
    gender: 'unknown',
    schoolType: 'unknown',  // 学校类型：985/211/双非/专科/海外/不透露
    degreeLevel: 'unknown', // 学历层次：专科/本科/硕士/博士/不透露
    major: 'unknown'
};

// 性别权重系数（基于统计趋势，不做硬性限制）
const genderWeights = {
    male: {
        entrepreneur: 1.1,    // 男性创业意愿略高
        private: 1.05,
        foreign: 1.0,
        soe: 0.95,
        civil: 0.9
    },
    female: {
        entrepreneur: 0.9,    // 女性创业意愿略低
        private: 0.95,
        foreign: 1.05,
        soe: 1.05,
        civil: 1.1           // 女性更倾向稳定
    },
    unknown: {
        entrepreneur: 1.0,
        private: 1.0,
        foreign: 1.0,
        soe: 1.0,
        civil: 1.0
    }
};

// 专业背景权重系数
const majorCareerMatch = {
    stem: {
        // 理工科
        entrepreneur: { bonus: 1.2, reason: '技术背景有助于创业，容易找到技术合伙人' },
        private: { bonus: 1.15, reason: '科技公司招聘需求大，起薪较高' },
        soe: { bonus: 1.1, reason: '国企技术岗位稳定，待遇中等偏上' },
        foreign: { bonus: 1.1, reason: '外企研发岗位多，国际化程度高' },
        civil: { bonus: 0.8, reason: '理工科对口公务员岗位较少，竞争激烈' }
    },
    business: {
        // 经管类
        entrepreneur: { bonus: 1.1, reason: '商业思维有助于创业，理解市场运作' },
        private: { bonus: 1.15, reason: '金融/咨询行业机会多，薪资水平高' },
        soe: { bonus: 1.2, reason: '国企金融/管理岗位对口，发展稳定' },
        foreign: { bonus: 1.1, reason: '外企管理/战略岗位，职业发展清晰' },
        civil: { bonus: 1.15, reason: '财政/审计/经济部门对口，发展稳定' }
    },
    arts: {
        // 文史类
        entrepreneur: { bonus: 0.9, reason: '创业需要其他技能支持，风险较高' },
        private: { bonus: 0.95, reason: '企业需求相对较少，主要在传媒/内容' },
        soe: { bonus: 0.95, reason: '国企宣传/文职岗位，发展较慢' },
        foreign: { bonus: 0.9, reason: '外企中文岗位有限，竞争激烈' },
        civil: { bonus: 1.3, reason: '公务员考试优势明显，对口岗位多' }
    },
    social: {
        // 社科类
        entrepreneur: { bonus: 1.0, reason: '创业需结合其他技能，机会中等' },
        private: { bonus: 0.95, reason: '企业HR/市场岗位需求稳定' },
        soe: { bonus: 1.0, reason: '国企行政/人事岗位，工作稳定' },
        foreign: { bonus: 0.95, reason: '外企HR/行政岗位，待遇中等' },
        civil: { bonus: 1.2, reason: '法学/社会学对口岗位多，竞争优势明显' }
    },
    design: {
        // 设计艺术
        entrepreneur: { bonus: 1.15, reason: '创意类创业机会多，个人品牌价值高' },
        private: { bonus: 1.2, reason: '互联网/广告公司需求大，薪资不错' },
        soe: { bonus: 0.85, reason: '国企设计岗位少，发展空间有限' },
        foreign: { bonus: 1.15, reason: '外企设计团队完善，创意氛围好' },
        civil: { bonus: 0.7, reason: '公务员几乎没有对口岗位' }
    },
    unknown: {
        entrepreneur: { bonus: 1.0, reason: '' },
        private: { bonus: 1.0, reason: '' },
        soe: { bonus: 1.0, reason: '' },
        foreign: { bonus: 1.0, reason: '' },
        civil: { bonus: 1.0, reason: '' }
    }
};

// 学校类型权重系数
const schoolTypeWeights = {
    '985': {
        entrepreneur: 1.1,    // 名校校友网络有帮助
        private: 1.15,       // 科技大厂偏爱名校
        soe: 1.1,            // 国企总部招聘偏向名校
        foreign: 1.15,       // 外企看重学历背景
        civil: 1.25          // 可以参加选调生，优势明显
    },
    '211': {
        entrepreneur: 1.05,
        private: 1.1,
        soe: 1.05,
        foreign: 1.1,
        civil: 1.2          // 部分地区定向选调
    },
    'normal': {
        entrepreneur: 0.95,
        private: 1.0,
        soe: 1.0,
        foreign: 0.95,
        civil: 1.0
    },
    'junior': {
        entrepreneur: 0.9,
        private: 0.95,
        soe: 1.0,            // 国企相对公平
        foreign: 0.85,       // 外企对学历要求高
        civil: 0.95
    },
    'overseas': {
        entrepreneur: 1.1,    // 海外背景有助于创业
        private: 1.1,        // 外企欢迎海归
        foreign: 1.2,        // 外企优势明显
        soe: 1.0,
        civil: 1.0
    },
    'unknown': {
        entrepreneur: 1.0,
        private: 1.0,
        soe: 1.0,
        foreign: 1.0,
        civil: 1.0
    }
};

// 学历层次权重系数
const degreeLevelWeights = {
    'phd': {
        entrepreneur: 1.1,   // 博士研究深度有助于技术创业
        private: 1.15,       // 研发核心岗位
        soe: 1.2,            // 国企对博士待遇优厚
        foreign: 1.15,       // 外企研发岗位
        civil: 1.25          // 博士引进政策，优势明显
    },
    'master': {
        entrepreneur: 1.05,
        private: 1.1,
        soe: 1.15,
        foreign: 1.1,
        civil: 1.2
    },
    'bachelor': {
        entrepreneur: 0.95,
        private: 1.0,
        soe: 1.0,
        foreign: 0.95,
        civil: 1.0
    },
    'junior': {
        entrepreneur: 0.9,
        private: 0.95,
        soe: 1.0,
        foreign: 0.85,
        civil: 0.95
    },
    'unknown': {
        entrepreneur: 1.0,
        private: 1.0,
        soe: 1.0,
        foreign: 1.0,
        civil: 1.0
    }
};

// 保存用户信息并开始测试
function saveUserInfoAndStart() {
    console.log('=== saveUserInfoAndStart 函数被调用 ===');
    
    try {
        // 获取表单元素
        const genderSelect = document.getElementById('gender');
        const schoolTypeSelect = document.getElementById('schoolType');
        const degreeLevelSelect = document.getElementById('degreeLevel');
        const majorSelect = document.getElementById('major');
        
        console.log('表单元素存在检查:');
        console.log('  genderSelect:', genderSelect);
        console.log('  schoolTypeSelect:', schoolTypeSelect);
        console.log('  degreeLevelSelect:', degreeLevelSelect);
        console.log('  majorSelect:', majorSelect);
        
        // 保存用户信息
        userInfo.gender = genderSelect.value;
        userInfo.schoolType = schoolTypeSelect.value;
        userInfo.degreeLevel = degreeLevelSelect.value;
        userInfo.major = majorSelect.value;
        
        console.log('用户信息已保存:', userInfo);
        
        // 获取section元素
        const userInfoSection = document.getElementById('userInfo');
        const introSection = document.getElementById('intro');
        
        console.log('Section元素存在检查:');
        console.log('  userInfoSection:', userInfoSection);
        console.log('  introSection:', introSection);
        
        if (!userInfoSection || !introSection) {
            console.error('❌ 找不到section元素！');
            return;
        }
        
        console.log('修改前的classList:');
        console.log('  userInfo classList:', userInfoSection.className);
        console.log('  intro classList:', introSection.className);
        
        // 隐藏用户信息页面，显示测试说明
        userInfoSection.classList.add('hidden');
        introSection.classList.remove('hidden');
        
        console.log('修改后的classList:');
        console.log('  userInfo classList:', userInfoSection.className);
        console.log('  intro classList:', introSection.className);
        
        // 验证修改是否成功
        console.log('验证display属性:');
        console.log('  userInfo display:', window.getComputedStyle(userInfoSection).display);
        console.log('  intro display:', window.getComputedStyle(introSection).display);
        
        console.log('=== saveUserInfoAndStart 执行完成 ===');
    } catch (error) {
        console.error('❌ saveUserInfoAndStart 执行出错:', error);
    }
}

// 跳过用户信息收集
function skipUserInfo() {
    // 直接进入测试说明
    document.getElementById('userInfo').classList.add('hidden');
    document.getElementById('intro').classList.remove('hidden');
}

// 开始测试
function startTest() {
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    document.getElementById('totalQuestions').textContent = questions.length;
    renderQuestion();
}

// 渲染题目
function renderQuestion() {
    // 检查是否有动态插入的额外问题
    if (additionalQuestions.length > 0 && currentQuestion >= questions.length) {
        const additionalIndex = currentQuestion - questions.length;
        if (additionalIndex < additionalQuestions.length) {
            renderAdditionalQuestion(additionalIndex);
            return;
        }
    }
    
    const question = questions[currentQuestion];
    const container = document.getElementById('questionContainer');
    
    let html = `
        <div class="question-card">
            <h3 class="question-text">${currentQuestion + 1}. ${question.text}</h3>
            <div class="options-list">
    `;
    
    question.options.forEach((option, index) => {
        const selected = answers[currentQuestion] === index ? 'selected' : '';
        html += `
            <div class="option-item ${selected}" onclick="selectOption(${index})">
                <div class="radio"></div>
                <div class="option-text">${option.text}</div>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // 更新进度
    const totalQuestions = questions.length + additionalQuestions.length;
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    document.getElementById('progress').style.width = progress + '%';
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    document.getElementById('totalQuestions').textContent = totalQuestions;
    
    // 更新按钮状态
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    const isLastQuestion = currentQuestion === totalQuestions - 1;
    document.getElementById('nextBtn').textContent = isLastQuestion ? '提交' : '下一题';
}

// 渲染额外的区分题目
function renderAdditionalQuestion(index) {
    const question = additionalQuestions[index];
    const container = document.getElementById('questionContainer');
    
    let html = `
        <div class="question-card additional-question">
            <div class="additional-badge">区分题</div>
            <h3 class="question-text">${questions.length + index + 1}. ${question.text}</h3>
            <div class="options-list">
    `;
    
    question.options.forEach((option, optionIndex) => {
        const selected = answers[questions.length + index] === optionIndex ? 'selected' : '';
        html += `
            <div class="option-item ${selected}" onclick="selectOption(${optionIndex})">
                <div class="radio"></div>
                <div class="option-text">${option.text}</div>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // 更新进度
    const totalQuestions = questions.length + additionalQuestions.length;
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    document.getElementById('progress').style.width = progress + '%';
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    document.getElementById('totalQuestions').textContent = totalQuestions;
    
    // 更新按钮状态
    const isLastQuestion = currentQuestion === totalQuestions - 1;
    document.getElementById('nextBtn').textContent = isLastQuestion ? '提交' : '下一题';
}

// 选择选项
function selectOption(optionIndex) {
    answers[currentQuestion] = optionIndex;
    renderQuestion();
}

// 上一题
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

// 下一题
function nextQuestion() {
    if (answers[currentQuestion] === undefined) {
        alert('请选择一个选项');
        return;
    }
    
    const totalQuestions = questions.length + additionalQuestions.length;
    
    if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        // 提交测试
        calculateResult();
    }
}

// 计算结果（优化版本）
function calculateResult() {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');
    
    // 初始化分数
    const scores = {
        entrepreneur: 0,
        private: 0,
        foreign: 0,
        soe: 0,
        civil: 0
    };
    
    // 计算基础分数（应用权重）
    const allQuestions = [...questions, ...additionalQuestions];
    
    allQuestions.forEach((question, questionIndex) => {
        const selectedOptionIndex = answers[questionIndex];
        if (selectedOptionIndex === undefined) return;
        
        const selectedOption = question.options[selectedOptionIndex];
        const weight = WEIGHTS[question.type] || 1.0;
        
        for (const [career, score] of Object.entries(selectedOption.scores)) {
            scores[career] += score * weight;
        }
    });
    
    // 应用用户信息权重（性别 + 学历 + 专业）
    applyUserInfoWeights(scores);
    
    // 应用互斥性惩罚
    applyExclusivityPenalty(scores);
    
    // 计算一致性得分
    const consistencyScore = calculateConsistencyScore();
    
    // 应用一致性惩罚（一致性低时所有职业得分降低）
    if (consistencyScore < 0.6) {
        for (const career of Object.keys(scores)) {
            scores[career] *= 0.8;
        }
    }
    
    // 计算最大可能得分（用于归一化）
    let maxPossibleScore = 0;
    questions.forEach(question => {
        const weight = WEIGHTS[question.type] || 1.0;
        maxPossibleScore += 9 * weight; // 最高9分 × 权重
    });
    
    // 转换为百分比
    const percentages = {};
    for (const [career, score] of Object.entries(scores)) {
        percentages[career] = Math.min(100, Math.round((score / maxPossibleScore) * 100));
    }
    
    // 排序找出最高匹配
    const sortedCareers = Object.entries(percentages)
        .sort((a, b) => b[1] - a[1]);
    
    // 检查相似度，决定是否需要额外问题
    const topDifference = sortedCareers[0][1] - sortedCareers[1][1];
    
    // 如果相似度过高且没有额外问题，插入区分题
    if (topDifference < SIMILARITY_THRESHOLD && additionalQuestions.length === 0) {
        insertAdditionalQuestions(sortedCareers);
        return;
    }
    
    // 延迟显示结果
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('result').classList.remove('hidden');
        displayResult(sortedCareers, consistencyScore, topDifference);
    }, 1500);
}

// 应用用户信息权重
function applyUserInfoWeights(scores) {
    // 应用性别权重
    const genderWeight = genderWeights[userInfo.gender] || genderWeights.unknown;
    for (const career of Object.keys(scores)) {
        scores[career] *= genderWeight[career];
    }
    
    // 应用学校类型权重
    const schoolTypeWeight = schoolTypeWeights[userInfo.schoolType] || schoolTypeWeights.unknown;
    for (const career of Object.keys(scores)) {
        scores[career] *= schoolTypeWeight[career];
    }
    
    // 应用学历层次权重
    const degreeLevelWeight = degreeLevelWeights[userInfo.degreeLevel] || degreeLevelWeights.unknown;
    for (const career of Object.keys(scores)) {
        scores[career] *= degreeLevelWeight[career];
    }
    
    // 应用专业权重
    const majorWeight = majorCareerMatch[userInfo.major] || majorCareerMatch.unknown;
    for (const career of Object.keys(scores)) {
        scores[career] *= majorWeight[career].bonus;
    }
}

// 应用互斥性惩罚
function applyExclusivityPenalty(scores) {
    EXCLUSIVE_PAIRS.forEach(([career1, career2]) => {
        const score1 = scores[career1];
        const score2 = scores[career2];
        
        // 如果两个互斥职业得分都较高
        const minScore = Math.min(score1, score2);
        const maxScore = Math.max(score1, score2);
        
        if (minScore > maxScore * 0.6) {
            // 两者得分接近，应用惩罚
            const penalty = minScore * 0.3;
            scores[career1] -= penalty;
            scores[career2] -= penalty;
        }
    });
}

// 生成个性化建议
function generatePersonalizedAdvice(topCareer, percentage) {
    const advice = [];
    
    // 基于性别的建议
    if (userInfo.gender === 'female' && topCareer === 'entrepreneur') {
        advice.push('💪 作为女性创业者，建议寻找女性导师或加入女性创业社群（如Lean In、女创空间等），这些资源能为你提供宝贵的指导和支持。');
    }
    if (userInfo.gender === 'female' && topCareer === 'civil') {
        advice.push('👩 女性在公务员系统中比例较高，很多部门（如妇联、民政、教育等）对女性求职者更为友好，建议重点关注。');
    }
    if (userInfo.gender === 'male' && topCareer === 'civil') {
        advice.push('📋 男性在公务员考试中竞争激烈，建议选择竞争相对较小的岗位（如基层执法、技术类岗位）以提高成功率。');
    }
    
    // 基于学校类型的建议
    if (userInfo.schoolType === '985' && topCareer === 'civil') {
        advice.push('🎯 作为985高校毕业生，强烈建议参加定向选调生考试。选调生的竞争压力远小于普通公务员考试，发展路径更清晰，晋升速度也更快。');
    }
    if (userInfo.schoolType === '985' && topCareer === 'soe') {
        advice.push('🏢 985学历在国企总部招聘中优势明显，建议关注央企总部的管培生项目和核心部门的校招，竞争相对较小。');
    }
    if (userInfo.schoolType === '985' && topCareer === 'private') {
        advice.push('💻 985学历在互联网大厂招聘中具有明显优势，建议重点关注技术岗、算法岗等核心岗位，起薪和发展都较好。');
    }
    if (userInfo.schoolType === '211' && topCareer === 'civil') {
        advice.push('📋 作为211高校毕业生，可以关注部分省份的定向选调机会，竞争比普通公务员小，发展前景较好。');
    }
    if (userInfo.schoolType === 'overseas' && topCareer === 'foreign') {
        advice.push('🌍 海外背景在外企招聘中优势明显，建议关注跨国公司，发挥语言和文化优势。');
    }
    if (userInfo.schoolType === 'overseas' && topCareer === 'entrepreneur') {
        advice.push('🌏 海外背景可以帮助你接触到国际化的创业资源，建议关注跨境业务、国际化产品等方向。');
    }
    if (userInfo.schoolType === 'normal' && topCareer === 'foreign') {
        advice.push('📚 普通本科进入外企可能需要从基础岗位做起，建议先积累1-2年工作经验，然后考虑申请外企的社招岗位。');
    }
    if (userInfo.schoolType === 'junior' && topCareer === 'foreign') {
        advice.push('⚠️ 外企对学历要求较高，专科生建议先在私企或国企积累经验，或者考取相关职业证书提升竞争力。');
    }

    // 基于学历层次的建议
    if (userInfo.degreeLevel === 'phd' && topCareer === 'civil') {
        advice.push('🎓 博士学历在公务员系统中享有特殊人才引进政策，建议关注各部委和省直机关的人才引进计划，直接面试录用，无需笔试。');
    }
    if (userInfo.degreeLevel === 'phd' && topCareer === 'soe') {
        advice.push('🔬 博士学历在国企待遇优厚，建议关注央企研究院、技术中心等核心研发岗位，起薪和晋升都有明显优势。');
    }
    if (userInfo.degreeLevel === 'phd' && topCareer === 'entrepreneur') {
        advice.push('💡 博士学历在技术创业中具有天然优势，建议关注AI、生物科技、新材料等高科技领域，利用学术积累和研究成果创业。');
    }
    if (userInfo.degreeLevel === 'master' && topCareer === 'civil') {
        advice.push('📜 硕士学历可以参加定向选调，建议重点关注组织部、发改委等核心部门的选调机会，竞争压力小。');
    }
    if (userInfo.degreeLevel === 'master' && topCareer === 'entrepreneur') {
        advice.push('🎓 硕士学历在创业中可以帮助你获得更多资源，建议关注高校创业孵化器和校友创业基金，这些平台能提供技术支持和资金扶持。');
    }
    if (userInfo.degreeLevel === 'master' && topCareer === 'private') {
        advice.push('💼 硕士学历在私企研发岗中具有优势，建议重点关注算法工程师、产品经理等岗位，起薪和晋升都较好。');
    }
    if (userInfo.degreeLevel === 'bachelor' && topCareer === 'private') {
        advice.push('📊 本科学历是私企招聘的主要对象，建议从基础岗位做起，快速积累经验，通过能力提升实现晋升。');
    }
    if (userInfo.degreeLevel === 'junior' && topCareer === 'soe') {
        advice.push('🏭 专科生在国企中可以从基层技术岗位做起，建议关注生产线管理、设备维护等岗位，通过技能提升实现职业发展。');
    }

    // 基于专业的建议
    if (userInfo.major === 'stem' && topCareer === 'civil') {
        advice.push('🔬 理工科背景在公务员系统中需求量较大，建议重点关注科技部门（工信部、科技部）、通信行业（工信部、各省市通信管理局）和信息化建设岗位。');
    }
    if (userInfo.major === 'stem' && topCareer === 'entrepreneur') {
        advice.push('💡 技术背景是创业的天然优势，建议关注技术驱动的创业方向（如SaaS、AI应用、智能制造等），并尽早寻找懂市场的合伙人。');
    }
    if (userInfo.major === 'business' && topCareer === 'private') {
        advice.push('📈 经管类背景在私企中机会很多，建议重点关注金融、咨询、互联网运营等岗位，这些领域对专业要求高，发展空间大。');
    }
    if (userInfo.major === 'business' && topCareer === 'soe') {
        advice.push('🏦 经管类在国企中优势明显，建议重点关注银行、保险、证券等金融机构，以及国企的财务、审计、投资部门。');
    }
    if (userInfo.major === 'business' && topCareer === 'civil') {
        advice.push('💼 经管类在公务员系统中需求很大，建议重点关注财政、税务、审计、统计、发改委经济部门等岗位，这些岗位与专业高度对口。');
    }
    if (userInfo.major === 'arts' && topCareer === 'civil') {
        advice.push('📖 文史类是公务员考试的黄金专业，建议重点关注宣传部门、文旅局、教育局、组织部文字综合岗等岗位，竞争优势明显。');
    }
    if (userInfo.major === 'arts' && topCareer === 'private') {
        advice.push('✍️ 文史类在私企中主要对接内容、公关、市场等岗位，建议重点提升新媒体运营能力和文案写作能力。');
    }
    if (userInfo.major === 'social' && topCareer === 'civil') {
        advice.push('⚖️ 社科类在公务员系统中需求稳定，法学专业建议关注法院、检察院、司法局、公安局等政法系统；心理学、教育学建议关注教育、民政等部门。');
    }
    if (userInfo.major === 'social' && topCareer === 'private') {
        advice.push('👥 社科类在私企中主要对接HR、行政、市场等岗位，建议重点提升人际沟通和组织协调能力。');
    }
    if (userInfo.major === 'design' && topCareer === 'entrepreneur') {
        advice.push('🎨 设计类专业创业机会很多，建议重点关注设计工作室、个人品牌、自媒体等方向，可以结合新媒体平台快速验证商业模式。');
    }
    if (userInfo.major === 'design' && topCareer === 'private') {
        advice.push('🖌️ 设计类在互联网和广告公司需求旺盛，建议重点关注UI/UX设计、品牌设计、产品视觉等方向，这些岗位薪资水平较高。');
    }
    if (userInfo.major === 'design' && topCareer === 'foreign') {
        advice.push('🌐 外企对设计人才需求稳定，建议关注跨国公司的品牌、设计、用户体验部门，工作环境和待遇相对较好。');
    }
    if (userInfo.major === 'design' && topCareer === 'civil') {
        advice.push('⚠️ 设计类专业在公务员系统中对口岗位极少，如果仍想进入体制内，建议关注文旅局、宣传部门的宣传工作，或者考虑参加不限专业的岗位。');
    }
    
    // 基于匹配度的建议
    if (percentage >= 75) {
        advice.push('✨ 您的职业倾向非常明确，这个方向与您的性格、价值观高度匹配，建议大胆追求！');
    } else if (percentage >= 60) {
        advice.push('👍 您的职业倾向较为明显，这个方向比较适合您，但建议多了解该职业的实际情况再做决定。');
    } else if (percentage >= 45) {
        advice.push('🤔 您的职业倾向属于中等水平，这个方向有一定匹配度，但建议与其他备选方向综合考虑。');
    } else {
        advice.push('💡 您的职业倾向较为分散，建议不要急于决定，可以先尝试不同方向的实习或工作，在实践中找到真正适合自己的方向。');
    }
    
    return advice;
}

// 计算一致性得分
function calculateConsistencyScore() {
    const consistencyQuestions = questions.filter(q => q.type === QUESTION_TYPES.CONSISTENCY);
    const consistencyIndices = consistencyQuestions.map(q => q.id - 1);
    
    // 检查相关题目的一致性
    let consistentCount = 0;
    let totalCount = 0;
    
    // 风险一致性检查
    const riskQuestions = [1, 41]; // 场景题vs自我评价
    if (answers[riskQuestions[0]] !== undefined && answers[riskQuestions[1]] !== undefined) {
        totalCount++;
        const q1Answer = answers[riskQuestions[0]];
        const q2Answer = answers[riskQuestions[1]];
        // 如果两者都选保守或都选进取，则一致
        if ((q1Answer === 2 && q2Answer === 2) || (q1Answer === 0 && q2Answer === 0)) {
            consistentCount++;
        } else if (q1Answer === 1 || q2Answer === 1) {
            // 中间选项也算一致
            consistentCount++;
        }
    }
    
    // WLB一致性检查
    const wlbQuestions = [3, 43];
    if (answers[wlbQuestions[0]] !== undefined && answers[wlbQuestions[1]] !== undefined) {
        totalCount++;
        const q1Answer = answers[wlbQuestions[0]];
        const q2Answer = answers[wlbQuestions[1]];
        if ((q1Answer === 2 && q2Answer === 2) || (q1Answer === 0 && q2Answer === 0)) {
            consistentCount++;
        } else if (q1Answer === 1 || q2Answer === 1) {
            consistentCount++;
        }
    }
    
    // 稳定性一致性检查
    const stabilityQuestions = [2, 42];
    if (answers[stabilityQuestions[0]] !== undefined && answers[stabilityQuestions[1]] !== undefined) {
        totalCount++;
        const q1Answer = answers[stabilityQuestions[0]];
        const q2Answer = answers[stabilityQuestions[1]];
        if ((q1Answer === 2 && q2Answer === 2) || (q1Answer === 0 && q2Answer === 0)) {
            consistentCount++;
        } else if (q1Answer === 1 || q2Answer === 1) {
            consistentCount++;
        }
    }
    
    return totalCount > 0 ? consistentCount / totalCount : 0.8;
}

// 插入额外区分题目
function insertAdditionalQuestions(sortedCareers) {
    const [topCareer, topScore] = sortedCareers[0];
    const [secondCareer, secondScore] = sortedCareers[1];
    
    // 根据最相似的两个职业选择区分题
    additionalQuestions = generateBoundaryQuestions(topCareer, secondCareer);
    
    // 重置到测试界面
    currentQuestion = questions.length;
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    renderQuestion();
}

// 生成边界区分题目
function generateBoundaryQuestions(career1, career2) {
    // 私企 vs 外企
    if ((career1 === 'private' || career2 === 'private') && 
        (career1 === 'foreign' || career2 === 'foreign')) {
        return [
            {
                type: QUESTION_TYPES.BOUNDARY,
                text: "补充题：外企的WLBvs私企的高薪，如果差距是15万，你选？",
                options: [
                    { text: "私企高薪", scores: { entrepreneur: 5, private: 9, foreign: 0, soe: 0, civil: 0 } },
                    { text: "外企WLB", scores: { entrepreneur: 1, private: 0, foreign: 9, soe: 2, civil: 1 } }
                ]
            },
            {
                type: QUESTION_TYPES.BOUNDARY,
                text: "补充题：你更看重企业文化中的哪个方面？",
                options: [
                    { text: "快速成长和扁平化", scores: { entrepreneur: 7, private: 9, foreign: 2, soe: 0, civil: 0 } },
                    { text: "规范流程和国际化", scores: { entrepreneur: 0, private: 0, foreign: 9, soe: 2, civil: 1 } }
                ]
            }
        ];
    }
    
    // 国企 vs 公务员
    if ((career1 === 'soe' || career2 === 'soe') && 
        (career1 === 'civil' || career2 === 'civil')) {
        return [
            {
                type: QUESTION_TYPES.BOUNDARY,
                text: "补充题：国企的薪资比公务员高5万，但公务员地位更高。你选？",
                options: [
                    { text: "国企高薪", scores: { entrepreneur: 0, private: 1, foreign: 2, soe: 9, civil: 2 } },
                    { text: "公务员地位", scores: { entrepreneur: 0, private: 0, foreign: 1, soe: 3, civil: 9 } }
                ]
            },
            {
                type: QUESTION_TYPES.BOUNDARY,
                text: "补充题：你更看重工作中的哪个特征？",
                options: [
                    { text: "企业经营性质，可能有加班", scores: { entrepreneur: 1, private: 2, foreign: 3, soe: 9, civil: 2 } },
                    { text: "公共服务性质，完全不加班", scores: { entrepreneur: 0, private: 0, foreign: 2, soe: 3, civil: 9 } }
                ]
            }
        ];
    }
    
    // 默认返回通用区分题
    return [
        {
            type: QUESTION_TYPES.BOUNDARY,
            text: "补充题：对于风险，你的真实态度是？",
            options: [
                { text: "极度保守", scores: { entrepreneur: 0, private: 1, foreign: 2, soe: 9, civil: 9 } },
                { text: "适度承担", scores: { entrepreneur: 3, private: 6, foreign: 6, soe: 4, civil: 2 } },
                { text: "高风险高回报", scores: { entrepreneur: 9, private: 7, foreign: 3, soe: 0, civil: 0 } }
            ]
        },
        {
            type: QUESTION_TYPES.BOUNDARY,
            text: "补充题：你期望的工作压力水平？",
            options: [
                { text: "高压高回报", scores: { entrepreneur: 8, private: 9, foreign: 3, soe: 0, civil: 0 } },
                { text: "中等压力", scores: { entrepreneur: 3, private: 6, foreign: 7, soe: 5, civil: 2 } },
                { text: "低压稳定", scores: { entrepreneur: 0, private: 0, foreign: 5, soe: 9, civil: 9 } }
            ]
        }
    ];
}

// 显示结果
function displayResult(sortedCareers, consistencyScore, topDifference) {
    const container = document.getElementById('resultContent');
    const resultIntro = document.getElementById('resultIntro');
    
    // 主要推荐
    const [primaryCareer, primaryPercentage] = sortedCareers[0];
    const career = careerInfo[primaryCareer];
    
    // 生成个性化建议
    const personalizedAdvice = generatePersonalizedAdvice(primaryCareer, primaryPercentage);
    
    // 根据一致性给出不同提示
    let introText = `根据你的回答，你最适合的职业方向是：`;
    if (consistencyScore < 0.6) {
        introText += `<br><span class="warning-text">⚠️ 注意：你的回答一致性较低，建议认真思考后再做决定</span>`;
    }
    if (topDifference < SIMILARITY_THRESHOLD) {
        introText += `<br><span class="info-text">💡 你的职业倾向较为均衡，前两名差距仅${topDifference}%，可参考对比分析</span>`;
    }
    
    resultIntro.innerHTML = introText;
    
    let html = `
        <div class="result-item primary">
            <span class="subtitle-tag">${career.icon} 最匹配</span>
            <h3>${career.name}</h3>
            <div class="percentage">${primaryPercentage}%</div>
            <p class="description">${career.description}</p>
            
            <div class="features">
                <h4>职业特征：</h4>
                <ul>
                    <li><strong>薪资收益：</strong>${career.features.salary}</li>
                    <li><strong>风险等级：</strong>${career.features.risk}</li>
                    <li><strong>工作生活平衡：</strong>${career.features.wlb}</li>
                    <li><strong>晋升机制：</strong>${career.features.promotion}</li>
                    <li><strong>稳定性：</strong>${career.features.stability}</li>
                </ul>
            </div>
            
            <div class="subcategories">
                <h4>细分方向：</h4>
                ${career.subcategories.map(sub => `
                    <div class="subcategory-item">
                        <h5>${sub.title}</h5>
                        <p>${sub.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // 个性化建议
    if (personalizedAdvice.length > 0) {
        html += `
            <div class="personalized-advice">
                <h3 style="margin: 24px 0 16px 0; color: var(--text-primary);">🎯 个性化建议</h3>
                ${personalizedAdvice.map(advice => `
                    <div class="advice-item">${advice}</div>
                `).join('')}
            </div>
        `;
    }
    
    // 其他推荐
    if (sortedCareers.length > 1) {
        html += `<h3 style="margin: 24px 0 16px 0; color: var(--text-primary);">其他可能的方向：</h3>`;
        
        sortedCareers.slice(1, 4).forEach(([careerName, percentage]) => {
            if (percentage > 30) {
                const career = careerInfo[careerName];
                const diff = sortedCareers[0][1] - percentage;
                
                // 为其他推荐也生成个性化建议
                const otherAdvice = majorCareerMatch[userInfo.major][careerName].reason;
                const adviceHtml = otherAdvice ? `<p class="advice-hint" style="margin-top: 8px; color: var(--text-secondary); font-size: 0.9rem;">💡 ${otherAdvice}</p>` : '';
                
                html += `
                    <div class="result-item">
                        <span class="subtitle-tag" style="background: ${career.color};">${career.icon}</span>
                        <h3>${career.name} - ${percentage}%</h3>
                        <p>${career.description}</p>
                        ${adviceHtml}
                        <p class="diff-text">与首选相差 ${diff}%</p>
                    </div>
                `;
            }
        });
    }
    
    // 测试质量分析
    html += `
        <div class="analysis-section">
            <h3 style="margin: 24px 0 16px 0; color: var(--text-primary);">测试质量分析</h3>
            <div class="analysis-item">
                <span class="analysis-label">回答一致性：</span>
                <span class="analysis-value ${consistencyScore >= 0.6 ? 'good' : 'warning'}">
                    ${Math.round(consistencyScore * 100)}%
                </span>
            </div>
            <div class="analysis-item">
                <span class="analysis-label">结果区分度：</span>
                <span class="analysis-value ${topDifference >= 15 ? 'good' : 'warning'}">
                    ${topDifference}%
                </span>
            </div>
            <div class="analysis-item">
                <span class="analysis-label">总答题数：</span>
                <span class="analysis-value">${questions.length + additionalQuestions.length}题</span>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// 重新测试
function retakeTest() {
    currentQuestion = 0;
    answers = [];
    additionalQuestions = [];
    document.getElementById('result').classList.add('hidden');
    document.getElementById('userInfo').classList.remove('hidden');
    document.getElementById('progress').style.width = '0%';
    
    // 重置用户信息
    userInfo = {
        gender: 'unknown',
        schoolType: 'unknown',
        degreeLevel: 'unknown',
        major: 'unknown'
    };
}

// 分享结果
function shareResult() {
    const text = "我刚刚完成了应届生职业倾向测试，发现自己最适合的职业方向！快来测测你的职业方向吧！";
    
    if (navigator.share) {
        navigator.share({
            title: '应届生职业倾向测试',
            text: text,
            url: window.location.href
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(text + '\n' + window.location.href).then(() => {
            alert('已复制到剪贴板！');
        }).catch(() => {
            alert('分享链接：' + window.location.href);
        });
    }
}

console.log('=== script.js 加载完成 ===');
console.log('questions 数量:', questions.length);
console.log('saveUserInfoAndStart 函数:', typeof saveUserInfoAndStart);
