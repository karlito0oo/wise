import { createContentStore } from '../server/models/contentStore.js';
import { createAdminStore } from '../server/models/adminStore.js';

const store = createContentStore();
try {
  // Check if admin already exists
  const existing = store.database.prepare('SELECT username FROM admins WHERE username = ?').get('admin');
  
  if (existing) {
    console.log("Admin account already exists in SQLite. Skipping creation.");
  } else {
    // Manually provision the user account directly using your app logic
    await createAdminStore(store.database).provision('admin', 'admin123!');
    console.log("Administrator 'admin' successfully provisioned via automation script!");
  }
} catch (error) {
  console.error("Failed to provision account:", error.message);
} finally {
  store.close();
}
