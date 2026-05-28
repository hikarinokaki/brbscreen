# 3D Acan - Floating Model & Collisions

A simple web app displaying a floating 3D model that handles collisions with projectiles launched via Twitch chat commands.

## Features
- **3D Rendering**: Powered by Three.js.
- **Physics**: Real-time collisions and movement using cannon-es.
- **Twitch Integration**: Listen to `!throw` commands in chat using tmi.js.
- **Screen Wrapping**: Objects teleport to the opposite side of the screen when they drift off-screen.
- **Auto-cleanup**: Projectiles are automatically removed after 30 seconds.

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Twitch**:
   Open `main.js` and update the `CONFIG.twitchChannel` variable:
   ```javascript
   const CONFIG = {
       // ...
       twitchChannel: 'your_channel_name_here',
       // ...
   };
   ```

3. **Run the App**:
   ```bash
   npm run dev
   ```

4. **Interact**:
   - Type `!throw` in your Twitch chat.
   - Press `Space` on your keyboard to test locally.

