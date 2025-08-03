const express = require('express');
const router = express.Router();

// Mock data with enhanced fields
const interns = [
    {
        id: 1,
        name: "Ayush Sharma",
        email: "ayush.sharma@example.com",
        phone: "+91 98765 43210",
        joinDate: "2023-01-15",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        referralCode: "ayush2025",
        donationsRaised: 18500,
        donationGoal: 20000,
        lastDonation: 2500,
        lastDonationDate: "2023-08-01",
        rewards: [
            { id: 1, name: "Top Performer", unlocked: true, icon: "🏆", description: "Awarded for being in top 3 fundraisers" },
            { id: 2, name: "Fundraiser Pro", unlocked: true, icon: "💎", description: "Raised over ₹15,000" },
            { id: 3, name: "Monthly Star", unlocked: true, icon: "⭐", description: "Top fundraiser of the month" },
            { id: 4, name: "Referral Champion", unlocked: true, icon: "🤝", description: "Referred 5+ friends" }
        ],
        socialMedia: {
            linkedin: "linkedin.com/in/ayush-sharma",
            twitter: "twitter.com/ayush_sharma"
        },
        bio: "Passionate about social causes and community development. Let's make a difference together!"
    },
    {
        id: 2,
        name: "Priya Patel",
        email: "priya.patel@example.com",
        phone: "+91 98765 43211",
        joinDate: "2023-02-20",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        referralCode: "priya2025",
        donationsRaised: 16200,
        donationGoal: 18000,
        lastDonation: 1800,
        lastDonationDate: "2023-07-28",
        rewards: [
            { id: 1, name: "Top Performer", unlocked: true, icon: "🏆", description: "Awarded for being in top 3 fundraisers" },
            { id: 2, name: "Fundraiser Pro", unlocked: false, icon: "💎", description: "Raised over ₹15,000" },
            { id: 3, name: "Monthly Star", unlocked: false, icon: "⭐", description: "Top fundraiser of the month" },
            { id: 4, name: "Referral Champion", unlocked: true, icon: "🤝", description: "Referred 5+ friends" }
        ],
        socialMedia: {
            linkedin: "linkedin.com/in/priya-patel",
            twitter: "twitter.com/priya_patel"
        },
        bio: "Believes in the power of education to transform lives. Supporting children's education initiatives."
    },
    {
        id: 3,
        name: "Rahul Verma",
        email: "rahul.verma@example.com",
        phone: "+91 98765 43212",
        joinDate: "2023-03-10",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        referralCode: "rahul2025",
        donationsRaised: 12450,
        donationGoal: 15000,
        lastDonation: 3200,
        lastDonationDate: "2023-07-30",
        rewards: [
            { id: 1, name: "Top Performer", unlocked: false, icon: "🏆", description: "Awarded for being in top 3 fundraisers" },
            { id: 2, name: "Fundraiser Pro", unlocked: true, icon: "💎", description: "Raised over ₹10,000" },
            { id: 3, name: "Monthly Star", unlocked: false, icon: "⭐", description: "Top fundraiser of the month" },
            { id: 4, name: "Referral Champion", unlocked: false, icon: "🤝", description: "Referred 5+ friends" }
        ],
        socialMedia: {
            linkedin: "linkedin.com/in/rahul-verma",
            twitter: "twitter.com/rahul_verma"
        },
        bio: "Tech enthusiast working towards bridging the digital divide. Let's code for a cause!"
    },
    {
        id: 4,
        name: "Ananya Gupta",
        email: "ananya.gupta@example.com",
        phone: "+91 98765 43213",
        joinDate: "2023-04-05",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        referralCode: "ananya2025",
        donationsRaised: 9800,
        donationGoal: 15000,
        lastDonation: 1500,
        lastDonationDate: "2023-07-25",
        rewards: [
            { id: 1, name: "Top Performer", unlocked: false, icon: "🏆", description: "Awarded for being in top 3 fundraisers" },
            { id: 2, name: "Fundraiser Pro", unlocked: false, icon: "💎", description: "Raised over ₹10,000" },
            { id: 3, name: "Monthly Star", unlocked: true, icon: "⭐", description: "Top fundraiser of the month" },
            { id: 4, name: "Referral Champion", unlocked: false, icon: "🤝", description: "Referred 5+ friends" }
        ],
        socialMedia: {
            linkedin: "linkedin.com/in/ananya-gupta",
            twitter: "twitter.com/ananya_gupta"
        },
        bio: "Environmental activist promoting sustainable living. Every small action counts!"
    },
    {
        id: 5,
        name: "Vikram Singh",
        email: "vikram.singh@example.com",
        phone: "+91 98765 43214",
        joinDate: "2023-05-15",
        avatar: "https://randomuser.me/api/portraits/men/52.jpg",
        referralCode: "vikram2025",
        donationsRaised: 8400,
        donationGoal: 10000,
        lastDonation: 2000,
        lastDonationDate: "2023-07-29",
        rewards: [
            { id: 1, name: "Top Performer", unlocked: false, icon: "🏆", description: "Awarded for being in top 3 fundraisers" },
            { id: 2, name: "Fundraiser Pro", unlocked: false, icon: "💎", description: "Raise over ₹10,000 to unlock" },
            { id: 3, name: "Monthly Star", unlocked: false, icon: "⭐", description: "Top fundraiser of the month" },
            { id: 4, name: "Referral Champion", unlocked: true, icon: "🤝", description: "Referred 3+ friends" }
        ],
        socialMedia: {
            linkedin: "linkedin.com/in/vikram-singh",
            twitter: "twitter.com/vikram_singh"
        },
        bio: "Fitness coach raising funds for health and wellness programs in underprivileged communities."
    },
    {
        id: 6,
        name: "Meera Nair",
        email: "meera.nair@example.com",
        phone: "+91 98765 43215",
        joinDate: "2023-06-01",
        avatar: "https://randomuser.me/api/portraits/women/36.jpg",
        referralCode: "meera2025",
        donationsRaised: 5800,
        donationGoal: 10000,
        lastDonation: 1200,
        lastDonationDate: "2023-07-27",
        rewards: [
            { id: 1, name: "Top Performer", unlocked: false, icon: "🏆", description: "Awarded for being in top 3 fundraisers" },
            { id: 2, name: "Fundraiser Pro", unlocked: false, icon: "💎", description: "Raise over ₹10,000 to unlock" },
            { id: 3, name: "Monthly Star", unlocked: false, icon: "⭐", description: "Top fundraiser of the month" },
            { id: 4, name: "Referral Champion", unlocked: false, icon: "🤝", description: "Refer 3+ friends to unlock" }
        ],
        socialMedia: {
            linkedin: "linkedin.com/in/meera-nair",
            twitter: "twitter.com/meera_nair"
        },
        bio: "Artist and educator raising funds for art programs in rural schools. Art changes lives!"
    }
];

// Helper function to calculate progress percentage
const calculateProgress = (raised, goal) => {
    return Math.min(Math.round((raised / goal) * 100), 100);
};

// Add progress data to each intern
const getInternWithProgress = (intern) => ({
    ...intern,
    progress: calculateProgress(intern.donationsRaised, intern.donationGoal),
    nextMilestone: Math.ceil(intern.donationsRaised / 5000) * 5000,
    daysLeft: Math.ceil((new Date('2023-12-31') - new Date()) / (1000 * 60 * 60 * 24))
});

// Get all interns with progress data
router.get('/', (req, res) => {
    const internsWithProgress = interns.map(getInternWithProgress);
    res.json(internsWithProgress);
});

// Get all interns (alternative route)
router.get('/all', (req, res) => {
    const internsWithProgress = interns.map(getInternWithProgress);
    res.json(internsWithProgress);
});

// Get leaderboard data (sorted by donations)
router.get('/leaderboard', (req, res) => {
    const leaderboard = [...interns]
        .sort((a, b) => b.donationsRaised - a.donationsRaised)
        .map((intern, index) => ({
            ...intern,
            rank: index + 1,
            progress: calculateProgress(intern.donationsRaised, intern.donationGoal)
        }));
    res.json(leaderboard);
});

// Get intern details with progress
router.get('/:id', (req, res) => {
    const intern = interns.find(i => i.id === parseInt(req.params.id));
    if (!intern) {
        return res.status(404).json({ message: 'Intern not found' });
    }
    res.json(getInternWithProgress(intern));
});

// Get intern by referral code
router.get('/referral/:code', (req, res) => {
    const intern = interns.find(i => i.referralCode === req.params.code);
    if (!intern) {
        return res.status(404).json({ message: 'Referral code not found' });
    }
    res.json({
        id: intern.id,
        name: intern.name,
        referralCode: intern.referralCode,
        avatar: intern.avatar
    });
});

// Get recent activity
router.get('/:id/activity', (req, res) => {
    const intern = interns.find(i => i.id === parseInt(req.params.id));
    if (!intern) {
        return res.status(404).json({ message: 'Intern not found' });
    }
    
    // Generate mock activity data
    const activities = [
        {
            id: 1,
            type: 'donation',
            amount: intern.lastDonation,
            date: intern.lastDonationDate,
            message: `Raised ₹${intern.lastDonation.toLocaleString()}`
        },
        {
            id: 2,
            type: 'milestone',
            amount: 5000,
            date: '2023-07-15',
            message: 'Reached ₹5,000 milestone!'
        },
        {
            id: 3,
            type: 'referral',
            date: '2023-07-10',
            message: 'Referred a new member'
        }
    ];
    
    res.json(activities);
});



module.exports = router;
