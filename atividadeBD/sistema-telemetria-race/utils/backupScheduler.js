// utils/backupScheduler.js
const cron = require('node-cron');
const { exec } = require('child_process'); 

// 1. Comando de Backup (do Passo 1)
const BACKUP_COMMAND = 'mongodump --db=telemetria_race --out=/caminho/para/backups/diarios/telemetria_$(date +%Y%m%d)';

function startBackupScheduler() {
    console.log('Agendamento de backup diário ativado (Q. 10).');
    
    // 2. Agendar a execução para 01:00 AM
    cron.schedule('0 1 * * *', () => { 
        console.log('🤖 Executando backup diário da telemetria...');
        
        // 3. Executar o comando no Shell
        exec(BACKUP_COMMAND, (error) => {
            if (error) {
                console.error(`❌ Erro no backup: ${error.message}`);
                return;
            }
            console.log('✅ Backup concluído com sucesso.');
        });
    }, {
        timezone: "America/Sao_Paulo" // Garante a hora correta
    });
}
module.exports = { start: startBackupScheduler };