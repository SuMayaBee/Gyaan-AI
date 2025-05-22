const { neonConfig, neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

// Setup Neon
require('dotenv').config();

async function migrate() {
  try {
    const sql = neon(process.env.NEXT_PUBLIC_DATABSE_CONNECTION_STRING);
    
    // Read SQL file
    const sqlContent = fs.readFileSync(
      path.join(process.cwd(), 'drizzle', '0000_stale_khan.sql'),
      'utf8'
    );
    
    // Execute SQL statements - split by statement breakpoint
    const statements = sqlContent.split('--> statement-breakpoint');
    
    console.log(`Executing ${statements.length} SQL statements...`);
    
    for (const statement of statements) {
      if (statement.trim()) {
        await sql(statement);
        console.log('Executed statement successfully');
      }
    }
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrate(); 