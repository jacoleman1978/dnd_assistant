# D&D Assistant

D&D Assistant is a React TypeScript web application designed to enhance your Dungeons & Dragons gameplay experience. The application features four main tools: "Criticals", "Find Items", "Group Rolls", and "Stat Set", each providing valuable functionality for both players and Dungeon Masters.

## Table of Contents

- [Features](#features)
  - [Criticals](#criticals)
  - [Find Items](#find-items)
  - [Group Rolls](#group-rolls)
  - [Stat Set](#stat-set)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Credits](#credits)
- [Future Features](#future-features)
- [License](#license)

## Features

### Criticals

The "Criticals" tab is a tool for rolling critical hits and misses. It supports the following damage types:
- Bludgeoning
- Slashing
- Piercing
- Magic

For Magic damage, the tool also requires the character's spell level. 

The melee critical tables were originally published by Carl Parlagreco in "Good Hits & Bad Misses" (Dragon #39, July 1980). 

The magic critical tables were created by Jonah Bomgaare and posted on the D20 Despot blog on July 13, 2015.

### Find Items

The "Find Items" tab is a tool determines if a magic item of a selected rarity is found, using a default find percentage value for each rarity that can be adjusted. If a magic item is found, the cost of the item is calculated using the equations from page 126 of "Xanathar's Guide to Everything".

### Group Rolls

The "Group Rolls" tab is a tool used to roll attacks or saves for a group of enemies, conjured creatures, or summoned creatures. This feature streamlines combat for the DM or a player who summons or conjures creatures, making it easier to manage multiple identical type rolls simultaneously.

### Stat Set

The "Stat Set" tab rolls a character set stat using 4d6, dropping the lowest die, six times. There are several configurations for the rolls:
- Setting a minimum stat roll allowed.
- Setting a minimum value for the sum of the six stats.
- Setting a value for which one of the stats must be equal to or greater than.

## Installation

To install and run D&D Assistant locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/dnd-assistant.git
   cd dnd-assistant

2. **Install dependencies:**
    ```bash
    npm install

3. **Start the development server:**
    ```bash
    npm start

The applicaiton will be available at `http://localhost:3000`.

## Usage

Once the applicaiton is running, navigate to `http://localhost:3000` in your web browser. You will see four tabs: "Criticals", "Find Items", "Group Rolls", and "Stat Set". Click on any tab to access its respective functionality.
- Use the **Criticals** tab to roll for critical hits and misses based on the damage type and character/spell level.
- Use the **Find Items** tab to determine if a magic item is found, adjust the find percentage, and calculate the cost.
- Use the **Group Rolls** tab to perform rolls for attacks or saves from multiple enemies or summoned creatures.
- Use the **Stat Set** tab to roll and configure character stats.

## Screenshots

- **Criticals** tab:
!["Select the crit type, character level, damage type, and if magic damage type the spell level"](/screenshots/screenshot_roll_crits.png?raw=true)

- **Find Items** tab:
!["Select the item rarity and find modifier"](/screenshots/screenshot_roll_for_items.png?raw=true)

- **Group Rolls** tab:
!["Select attacks or saves and then the relevant data"](/screenshots/screenshots_group_rolls.png?raw=true)

- **Stat Set** tab:
!["Select the min stat allowed, min stat sum, and at least one stat is"](/screenshots/screenshot_roll_stat_set.png?raw=true)

## Credits

- **Melee Critical Tables**: Carl Parlagreco, "Good Hits & Bad Misses", Dragon #39 (July, 1980).
- **Magic Critical Tables**: Jonah Bomgaare, D20 Despot blog (July 13, 2015).
- **Item Cost Equations**: Page 126 of "Xanathar's Guide to Everything".

## Future Features

- **Additional Damage Types**: Add Cold, Poison, Acid, Psychic, Fire, Necrotic, Radiant, Force, Thunder, and Lightning to the Damage Type selection list for use with related crit tables.
- **Settings to Set Default Values**: Use your browser's local storage to keep your chosen default character level, etc.
- **Radio Button for Consumable Items**: Add a radio button toggle, defaulted to "Nonconsumable", that will adjust the price when "Consumable" is selected.
- **Multiple Groups to Group Rolls**: Have two to three sections on the "Group Rolls" tab, so that multiple groups with different modifiers, levels and type can have a certain number of rolls against a target AC/DC.

## License
Copyright 2024 Jamie Coleman

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.