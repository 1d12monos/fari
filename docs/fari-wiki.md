# Introduction

<page-meta author="René-Pier Deshaies-Gélinas" description="Everything you need to know to use Fari effectively."></page-meta>

Fari might seem like a simple application at first, but there a lot of more advanced features that you can leverage to boost your Fate online sessions to the next level.

This Wiki will go over the basic feature as well as the more advanced use cases step by step to give you the ability to use Fari at its full potential.

> Have an idea and want to contribute to this wiki ? Come chat with us on [Discord](https://discord.com/invite/vMAJFjUraA).

# Playing

When playing in real life, you go to you friend's house, sit at their table and just get started immediately.

Playing your favorite TTRPG with Fari isn't more complicated than that, though there are still a couple of things you should know before getting started.

## Online VS Offline

To start a new game session, Fari offers you the following two options:

- Playing Online
- Player Offline

### Online

When you play online, Fari will open a new connection with a server to authenticate you and then give you access to a unique link that you can send to your friends.

Sharing that link with people will give them access to your game

![Copying a Game Link](https://gyazo.com/d00cf8bf9b69416ccc5e29c5539ce719.png)

After they entered their name and joined a game, every modification that you do the game will be synced with all the players using something called `peer to peer communication` using the `WebRTC` protocol.

The data that is synced includes things like the index card, the drawing pad and even dice rolls.

![Joining a Game](https://gyazo.com/c3c4a71bfc268c8739a016a07756f122.png)

### Offline

The Offline mode is useful if everyone are physically in the same room but the GM still wants to use Fari to manage their Scenes.

When playing in Offline mode, Fari won't connect to its server and won't generate the unique link cited above. It will instead just store everything locally in a temporary manner.

This mode is also useful if for some reasons, some of your players can't connect to your Online game session and you want to share your screen with them. See more about connection issues below.

> #### Issues When Joining a Game
>
> Some users might experience issues when trying to join an Online game session.
>
> If that is the case for you or one of your player, you should look into why this is happening here.
>
> [Connection Issues | Fari Wiki](/fari-wiki/connection-issues)

## Player: Choose your Character

When a player joins an Online game session, they don't have a character linked to them yet.

Kind of like in real life, the player needs to pull their character sheet out of their bag and put it on the table.

To do that, a player simply has to click on the `+` button beside their name on the left of the screen.

![Add A Character Sheet](https://gyazo.com/34943288cf4b1245323ced6dc8902c56.png)

You then have the ability to do three things:

- `Select` an existing character from the list.
- Create a `New` Character.
- `Import` a character based off a template your GM might have given you.

Once that is done, you are ready to play!

## GM: Managing Game Scenes

### New Scenes

When you start either an Online or Offline game, Fari creates a `New Empty Scene`.

From there, you can get started and start playing right away, but as you play, your players will move forward in the story and you will want to get a new scene going.

If so, you can create a `New Empty Scene` again by pressing the `New Scene` button.

![GM Controls](https://gyazo.com/32f320a4c24b5f341c8b13ce290bf768.png)

### Saving

During a game session, there a very high probably that have to cancel the session early, but you probably don't want to loose your current scene and all the index cards you've added so far.

No worries, simply click the `Save Scene` button and Fari will save your scene so that you can load it in another game session.

### Loading Scenes

Wether you had to leave your last game session early or you've prepared scenes in advance for tonights game, Fari lets you load scenes on the fly during your session so that you are always on top of your game.

Use the `...` menu on the right and either click `Load Scene` or `Clone And Load Scene`

![Loading a Scene](https://gyazo.com/5f093ab4cdf5783d1f61818d1120251f.png)

> #### Load VS Clone and Load
>
> Everytime you create something in Fari, Fari creates a unique identifier and attach it to what you created.
>
> When you `Load a Scene`, you are truly loading _this_ scene. Which means that if you click `Save` during your game session, you will modify the scene you loaded.
>
> When you `Clone and Load` a scene, Fari will clone that scene and assign it a new unique identifier. So modifications done during the game session will be done on the copy of the scene and not the original.
>
> This can be useful if for example you want to have a "Scene Template" that you want to use or something along those lines.

# Managing Scenes

🚧 👷 🚧

# Managing Characters

This goal of this guide is to help you understand everything you can do with Fari's Character Sheet framework.

Fari's character sheets are extremely flexible and basically limitless, so here how you can get the most out of it.

## Customizing your Character Sheets

When you create a new character, Fari will load the `Fate Condensed` template by default, if you want to customize your sheet yourself or load a different template, simply toggle the `Advanced Mode`.

![Toggle The Advanced Mode](https://gyazo.com/39c3eea686057a9e18168bb5725251e2.gif)

## Name & Group

You can give your character a `Name` and assign them a `Group`. Groups are a basic organization feature where characters with the same group will be _grouped_ together when you open the Character Drawer.

You can view the `Group` field as a "Campaign" field if you want.

## Pages

When the `Advanced Mode` is turned on, you can customize how your sheet is organized.

The Character Sheet is seperated into multiple `Pages/Tabs` where each page can have its own set of sections and building blocks.

### Adding a Page

To add a page, click on the `+` icon on the right and click on the Page name to rename it as you wish

![Addding a Page](https://gyazo.com/e180cb0f68661380ed9da33ef3285459.gif)

### Moving a Page

You can also move your pages left or right by using the Move Page arrows.

![Moving a Page](https://gyazo.com/0438808d699788ce5c1173861828940e.gif)

### Deleting a Page

Finally, if you want to remove a page, you can do so by simply clicking on the Remove Page button which is located between the Move Page arrows

## Sections

Sections let you group your building blocks of a similar kind together.

### Adding a new Section

At the bottom of a each existing section, you can find a button labeled as `Add Section` which will let you add a section below the on you are looking at.

Once added, you can change its name simply by clicking on it and typing what you want.

![Adding a new Section](https://gyazo.com/95eb5246e35aec45063851d45c17f67b.gif)

### Making Sections Visible inside the Character Card

On the right side of your section's name, you will see an Eye button representing the `Visible on Card` action.

Clicking on it will make your entire section visible inside the Character Card.

The Character Card is kind of a condensed version of your character sheet that is going to be accessible to everyone during a game session.

You can use this functionality to make some sections of your characters sheets easily reachable during game play.

![The Character Card](https://gyazo.com/55e37b3a90e53315cee976d386ffb755.png)

### Moving a Section

Besides the Visible on Card button, there's the `Move Section` button. Clicking on this one will give you the ability to move your section up or down, on the other side of your sheet or on a completely different page.

![Moving a Section](https://gyazo.com/45b9b219653989248991e1695ba2c44f.gif)

## Blocks

Blocks are at the core of Fari's character sheets. They are like Legos that you can use to create something incredible.

Fari currently supports 6 different types of blocks

- Text
- Numeric
- Skill
- Dice Pool
- Point Counter
- Slot Tracker

![Different Types of Blocks](https://gyazo.com/ede9dec5d82ae085bdf04185db66a156.png)

### Adding a new Block

To add a new block, simply scroll at the bottom of a section and look for the `Add Block` button.

From there, choose the type of block you want to add and this block will be appended at the bottom of your section.

![Adding a Block](https://gyazo.com/af540b6c631f6028dccf704a45fb488a.gif)

#### Text Block

This block can be used to keep text based information. Things like notes or character aspects and things of the sort.

- `Add Toggle`: This control will append a toggle right beside your block's label. It can be useful to track when a power is used or if an aspect of your character is corrupted, etc.

![Text Block](https://gyazo.com/f3a229e8245c4b04db68b8f97ef27df0.png)

#### Numeric Block

Numeric blocks are useful if you are looking for something similar to a Text block, but made to handle numbers instead.

- `Add Toggle`: This control will append a toggle right beside your block's label.

![Numeric Block](https://gyazo.com/77eedbbf4768e0b42949bc9946a3e1eb.png)

#### Skill Block

If there is something inside your character sheet you think should trigger a dice roll, this is kind of block you are looking for.

Skill Blocks let you add a skill or ability to the sheet.

This skill then is linked to a set of dice commands as well as a dice result modifier.

Once configured, clicking on the dice button will enable the Dice floating action button at the bottom left corner on the screen.

Once enabled, clicking on the `Roll` label will let you roll that specific skill right away.

- `Add Toggle`: This control will append a toggle right beside your block's label.
- `Set Dice`: Clicking on this control will display the dice menu so that you can select the set of dice commands that skill should roll.
- `Hide Modifier`: Skills don't always have to have a modifier that should be added to the result. For that reason, this control will hide the modifier input to keep the character sheet tidy and clean.

![Skill Block](https://gyazo.com/e48b414263349f33c6cf67e7cd5b701b.png)

#### Dice Pool Block

Similar the the skill block, Dice Pools will let you create some sort of skill that is attached to a set of dice that should be added to a dice pool.

Once configured, when a players clicks on the pool button, all the dice commands inside that block will be added to the pool.
Clicking on it again will remove the dice commands from the pool.

When the pool is complete, the player simply needs to click on the `Roll Pool` floating action button at the bottom left corner of the screen.

- `Set Dice`: Clicking on this control will display the dice menu so that you can select the set of dice that the pool should contain

![Dice Pool Block](https://gyazo.com/9d6ccb333b78e5b7b5ea724ccfe42943.png)

#### Point Counter Block

This kind of block is useful if you are looking to track any sort of point based value. Use it to track your Fate Points, health points, gold pieces, etc.

- `Set as Main Counter`: This control lets you select a **single** point counter as the main one. The main point counter is going to be the one that is displayed in the Players section when you are playing a game session.
- `With Max`: Use this value if you want to have a max value attached to your point counter.

![Point Counter Block](https://gyazo.com/b520f5e1d36a3de7f11bcf401721accd.png)

![Main Counter](https://gyazo.com/0f69f3cbf6c3710d521824a2e1275626.png)

#### Slot Tracker Block

Slot trackers let you add a block where you can have a bunch of checkboxes that will help you track things. You can use that to track your stress in Fate or trauma in Blades in the Dark.

- `Add/Remove Box`: Those buttons will let you add or remove a box to your slot tracker.
- `Box Labels`: Slot tracker block contains boxes, each one of those boxes can be checked or unchecked. You can also customize the label attached to a box. When left empty, the label will simply be hidden when the advanced mode is turned off. You can use that to attach a specific meaning to each box.

![Slot Tracker Block](https://gyazo.com/45123ed0af8ae1772788b34278300c80.png)

### Generic Block Controls

Blocks are all based around the same idea, for that reason all types of blocks have a similar set of actions you can use to help you create a nice character sheet.

- `Move`: Using the drag icon, you can move your blocks _inside the section_ by simply dragging and dropping them where you you
- `Duplicate`: This action will let you duplicate and append right below a block of the type type with the same values
- `Remove`: This action will remove the block from the section
- `Help Text`: Each block can have some help text attached to it. It can useful when you want to provide some useful information to the user of the sheet about what a certain block is about or how its used in the game.
  - When left empty, the help text will disappear when the advanced mode is toggled off.

![Generic Block Controls](https://gyazo.com/45af086acdaf7542f343e361a1d078d0.png)

# Tips and Tricks

## Use Images

Fari supports adding images to Character Sheet and Index Card fields very easily.

Simply go on the internet, copy an image in your clipboard and paste it in a field inside the character sheet or an index card.

![Copy an image](https://gyazo.com/db1eede383593cfa829359358ec58c4f.png)
![Paste it in a field](https://gyazo.com/ce1a801bf9bf7362954d0a0a64571117.png)

## Index Card Roll Modifiers

Not every NPC needs to be a full-on character sheet, but the benefit of using character sheets in Fari is that you can easily click on a skill to roll 4dF + a skill modifier.

Well, Fari supports doing that for index cards as well!

By using the following syntax `[skill: modifier]` inside an Index Card description, Fari will automatically add a link at the bottom of the index card so that you can easily roll `4dF` a skill modifier.

![Index Card Skill Modifier](https://gyazo.com/04ddec1356bf3b25022341f40d6f3a25.gif)

# Internationalization and localization

Fari is available in multiple languages like English, Spanish and French but if you are interested in translating Fari in another language or update a bad translation, this document is the right place to start.

Fari's supported languages are split into multiple files where each file contains a list of keys used by the app and their translated values.

## Lokalise

Fari uses [Lokalise](https://lokalise.com/) to help with localization.

If you are interested in contributing to Fari's in a significant way, contact [RPDeshaies on Discord](https://discord.com/invite/vMAJFjUraA) to see about becoming an official Fari Translator.

Otherwise, take a look at the other options for translating Fari programmatically.

## Adding a new language to Fari

To add a new language to Fari, you can download the [english translation file](https://github.com/fariapp/fari/blob/master/locales/en.json) and update the values of each key.

Once the file is translated, [open a feature request](https://github.com/fariapp/fari/issues/new/choose) and upload the new file in the issue.

A developer will then integrate the file into the application.

## Updating a translation value

It's possible that something in the app was badly translated, in that case, you can find the proper [language file](https://github.com/fariapp/fari/tree/master/locales/en.json) and open an issue to say which key needs to be updated and what should be the new value.

Also, try to include the reason why the original value was not good.

## About Page

The About page is not translated using the translations keys like the rest of the pages, it instead uses one markdown file per language which is saved in [this folder](https://github.com/fariapp/fari/tree/master/lib/routes/About/page).

If you want to translate the app, you should also provide a translated version of the About page in markdown format.

To do so, you can [download the English About page](https://raw.githubusercontent.com/fariapp/fari/master/lib/routes/About/page/About.en.md) and translate its content in the language of your choice.

# Connection issues

It is possible that, depending on your internet service provider configuration, you might not be able to use Fari's online functionalities.

The reason for this is because Fari relies on something called peer-to-peer connections using WebRTC.

To be able to establish the connection between the GM and the players, Fari uses a server to get the IP addresses of the GM and the players and once it has them, establishes a peer to peer connection between them.

But, it might be impossible for Fari to get the IP address of certain users.

## Reason

Taken from the documentation of PeerJS, the peer-to-peer library Fari uses:

> A small percentage of users are behind symmetric NATs. When two symmetric NAT users try to connect to each other, NAT traversal is impossible and no connection can be made. A workaround is to proxy through the connection through a TURN server. - https://peerjs.com/docs.html

While PeerJS offers a free TURN server for the community, Fari cannot use it because it's linked to their free PeerJS Server which is often down because too many people use it and it reaches its concurrent user limit.

This is the reason why Fari uses it's own PeerJS Server.

## Solution

There are multiple solutions that Fari could use to fix this issue but they all come at a price, literally.

We could spin our own TURN server. Compared to the normal peer-to-peer scenario where users transfer their data between each other without any middleman, TURN servers are responsible for transferring all the data from one user to the other, which makes them very expensive to run. (min 400$ per year)

We could also use a real-time database like Google Firebase, but this could also end up being expensive (~1$ per GB transferred per month with a minimum of 10GB, so more than 100$ per year)

All of that said, we also need to consider the developer time / maintenance cost of maintaining those infrastructures.

## Other options

If someone in the community thinks there are other alternatives, I'm all ears.

For now, what I can say is that if you discover that yourself or friends can't connect to one another, you should look into using Fari's Offline Mode (for the GM) and share your screen with the rest of your friends.

http://fari.app/play-offline

## One last thing

It really saddens me to not be able to do more for this, but because Fari is free, and I'm mostly working alone on this, the money and the time investment required to be able to make Fari's online functionalities more reliable for everyone is too big.
