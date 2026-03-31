export type TipCard = {
  id: number
  numeral: string
  suit: 'combat' | 'exploration' | 'abyss' | 'social'
  title: string
  subtitle: string
  body: string
}

// SVG path data for suit icons (inline, no emoji)
export const SUIT_SVGS: Record<TipCard['suit'], string> = {
  // Crossed swords
  combat: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3l7 7m0 0l4-4 7-7-7 7-4 4zm0 0L6.5 13.5M10 10l4 4m0 0l3.5 3.5M14 14l-3 3-1.5 1.5M5 19l2-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3 21l4.5-4.5M21 3l-4.5 4.5M8 3L3 8M16 21l5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,
  // Compass rose
  exploration: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/>
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M12 7l1.5 5H10.5L12 7z" fill="currentColor"/>
    <path d="M12 17l-1.5-5h3L12 17z" fill="currentColor" opacity="0.5"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
  </svg>`,
  // Void eye / arcane spiral
  abyss: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9z" stroke="currentColor" stroke-width="1.5"/>
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" stroke="currentColor" stroke-width="1"/>
    <path d="M12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" stroke="currentColor" stroke-width="1"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
  </svg>`,
  // Shield / social
  social: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4 6v6c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V6l-8-4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
}

// Keep emoji fallbacks for accessibility / alt text
export const SUIT_ICONS: Record<TipCard['suit'], string> = {
  combat: '⚔️',
  exploration: '🗺️',
  abyss: '🌀',
  social: '🤝',
}

export const SUIT_ART: Record<TipCard['suit'], string> = {
  combat: '/assets/suit-combat.jpg',
  exploration: '/assets/suit-exploration.jpg',
  abyss: '/assets/suit-abyss.jpg',
  social: '/assets/suit-social.jpg',
}

export const cards: TipCard[] = [
  {
    id: 1,
    numeral: 'I',
    suit: 'combat',
    title: 'Axiom Pull',
    subtitle: 'Objects obey your will',
    body: 'Press Tab to activate Axiom Force and pull enemies, objects, or projectiles toward you. Use it mid-combo to chain attacks without losing momentum. Pulled enemies are briefly staggered, opening them to a follow-up heavy strike. Master this and crowd control becomes effortless.',
  },
  {
    id: 2,
    numeral: 'II',
    suit: 'combat',
    title: 'Perfect Parry',
    subtitle: 'Timing is everything',
    body: 'A well-timed parry staggers enemies and opens a critical counter window. The timing window is tight — watch for the white flash on incoming attacks. After a perfect parry, your next heavy attack deals bonus damage and breaks enemy guard. Practice against weaker enemies before attempting on bosses.',
  },
  {
    id: 3,
    numeral: 'III',
    suit: 'combat',
    title: 'Combo Finisher',
    subtitle: 'End it with authority',
    body: 'End any combo string with a charged heavy attack to break enemy stance. Broken stance enemies drop to one knee and are vulnerable to a finisher prompt. This deals the highest single-hit damage in your toolkit. Stance break cooldown resets after the enemy recovers — watch pacing.',
  },
  {
    id: 4,
    numeral: 'IV',
    suit: 'combat',
    title: 'Aerial Juggle',
    subtitle: 'Take the fight upward',
    body: 'Jump and attack simultaneously to launch lighter enemies into the air. Follow up with continued aerial strikes before they land. This avoids ground-based counterattacks entirely and builds combo multiplier fast. Not all enemies can be launched — try it on humanoid and beast types first.',
  },
  {
    id: 5,
    numeral: 'V',
    suit: 'combat',
    title: 'Read the Glow',
    subtitle: 'Bosses always telegraph',
    body: 'Boss attacks glow gold or red just before they land. Gold glow means parryable; red glow means dodge only. Learning this distinction removes the guesswork from boss fights entirely. When in doubt, sidestep — a mistimed parry against a red attack will stagger you instead.',
  },
  {
    id: 6,
    numeral: 'VI',
    suit: 'exploration',
    title: "Nature's Grasp",
    subtitle: 'The world is a key',
    body: "Nature's Grasp unlocks gates sealed with vines and interacts with environmental anchor points. Many locked doors in dungeons and temples have a vine cluster nearby — look around before assuming a key is needed. It also pulls climbable surfaces toward you, creating shortcuts that bypass long paths.",
  },
  {
    id: 7,
    numeral: 'VII',
    suit: 'exploration',
    title: 'Updraft Zones',
    subtitle: 'Glide further, fall less',
    body: 'Certain terrain — cliff edges, volcanic vents, burning areas — generates updrafts that extend glide duration significantly. Spread your arms at the glide apex to feel for lift. Chaining updrafts allows cross-canyon travel that appears impossible at first glance. Scout from high ground before committing to a long glide route.',
  },
  {
    id: 8,
    numeral: 'VIII',
    suit: 'exploration',
    title: 'Nexus Travel',
    subtitle: 'Reset and return fast',
    body: 'Abyss Nexus points serve as both fast travel nodes and enemy respawn triggers. Activating one locks it as a return point. Use them to reset difficult encounters — enemies respawn but so does your positioning advantage. Chain Nexus activations across a region before diving deep.',
  },
  {
    id: 9,
    numeral: 'IX',
    suit: 'exploration',
    title: 'Wildlife Park',
    subtitle: 'East of Hernand',
    body: 'Demeniss Wildlife Park sits approximately 2000 meters east of Castle Hernand in South Demeniss. Use Nature\'s Grasp to open the entry gate. The park itself is peaceful despite aggressive mobs on the approach path. An Abyss Nexus nearby makes it an ideal farming reset point.',
  },
  {
    id: 10,
    numeral: 'X',
    suit: 'exploration',
    title: 'Hidden Caches',
    subtitle: 'Walls lie sometimes',
    body: 'Breakable walls are scattered throughout dungeons, ruins, and cliff faces — they look slightly different in texture from solid stone. Strike suspicious wall sections with a heavy attack. Behind them: supply caches, shortcuts, and occasionally rare material nodes. If a room feels too small for its exterior, there is probably a wall to break.',
  },
  {
    id: 11,
    numeral: 'XI',
    suit: 'abyss',
    title: 'Stack Resonance',
    subtitle: 'Power compounds',
    body: 'Abyss Resonance stacks with each Abyss-type ability used in succession. At three stacks, your next Abyss attack deals a significant damage bonus and applies a debuff to the target. Do not break the chain with non-Abyss abilities — the stack resets on any interruption. Build your rotation around maintaining flow.',
  },
  {
    id: 12,
    numeral: 'XII',
    suit: 'abyss',
    title: 'Nexus Resets',
    subtitle: 'Respawn the world',
    body: 'Resting at or fast-traveling through an Abyss Nexus resets all nearby enemy spawns. This is the primary farming loop for consumables and materials. Identify high-density enemy areas near a Nexus, clear them, reset, repeat. The most efficient farming routes are never more than 90 seconds from the nearest Nexus.',
  },
  {
    id: 13,
    numeral: 'XIII',
    suit: 'abyss',
    title: 'Cresset Sequence',
    subtitle: 'Light remembers order',
    body: 'Ancient ruin puzzles require lighting Cressets (braziers) in a specific sequence. The correct order is usually encoded in the surrounding carvings or statue orientations. When stuck, look for worn floor paths between Cressets — they indicate the intended walking order. Lighting in the wrong sequence resets all flames.',
  },
  {
    id: 14,
    numeral: 'XIV',
    suit: 'abyss',
    title: 'Rift Drops',
    subtitle: 'Risk for rare rewards',
    body: 'Abyss Rifts that appear after defeating elite enemies lead to pocket dimensions with rare material nodes and guaranteed drop chests. They are time-limited — the rift closes after roughly 90 seconds. Prioritize the chest over the nodes if time is short. Rift-exclusive crafting materials cannot be obtained elsewhere.',
  },
  {
    id: 15,
    numeral: 'XV',
    suit: 'abyss',
    title: 'Corruption Warning',
    subtitle: 'Red edge means retreat',
    body: 'A red vignette at the screen edges signals high Abyss corruption level. Sustained corruption reduces max health and distorts enemy behavior — elites become unpredictable. Retreat to a Nexus to purge corruption before it reaches critical. Certain consumables also cleanse it instantly if retreating is not an option.',
  },
  {
    id: 16,
    numeral: 'XVI',
    suit: 'social',
    title: 'Noble Pickpocket',
    subtitle: 'Gold from the gentry',
    body: 'Masked nobles inside Demeniss Wildlife Park carry gold bars and can be pickpocketed repeatedly. Approach from behind and hold the interact prompt without breaking line of sight. After each successful pickpocket, step away and return — the cooldown is short. This is one of the most efficient gold farming methods in the mid-game.',
  },
  {
    id: 17,
    numeral: 'XVII',
    suit: 'social',
    title: 'Fabrizio Bounty',
    subtitle: 'Check the east side',
    body: 'Fabrizio, the wanted outlaw, hides on the eastern side of Demeniss Wildlife Park. He blends with the scenery and does not appear on the minimap until you are very close. Approach from the east entrance rather than through the main gate to cut travel time. He drops a bounty token redeemable at any guild board.',
  },
  {
    id: 18,
    numeral: 'XVIII',
    suit: 'social',
    title: 'Repair the Temple',
    subtitle: 'Axiom heals stone',
    body: 'The Jijeong Temple in Chaos quest (Chapter 9) requires repairing three broken pensive statues using Axiom Force. Locate the body and two hands for each statue via minimap markers. Align each piece precisely between the stone lantern flames, thumbs pointing outward, then connect with a force palm. All three must be repaired to complete the quest.',
  },
  {
    id: 19,
    numeral: 'XIX',
    suit: 'social',
    title: 'Merchant Timing',
    subtitle: 'Reset means restock',
    body: 'Traveling merchants and settlement vendors restock their inventories after each Abyss Nexus reset. If a vendor is out of a key consumable, reset the nearest Nexus and check again before moving on. Some rare items only appear on the third or fourth restock cycle — persistence pays off.',
  },
  {
    id: 20,
    numeral: 'XX',
    suit: 'social',
    title: 'Guild Contracts',
    subtitle: 'Do not wait too long',
    body: 'Guild contracts tied to specific regions expire when you progress past key story thresholds. Check the contract board at every new settlement before completing the main quest in that area. Expired contracts cannot be recovered. High-tier contracts reward unique cosmetics and crafting schematics unavailable through other means.',
  },
]
