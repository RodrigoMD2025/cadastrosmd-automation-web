-- Tabela para acompanhar progresso de uploads em tempo real
CREATE TABLE IF NOT EXISTS upload_progress (
    upload_id VARCHAR(100) PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    total_records INTEGER NOT NULL DEFAULT 0,
    processed_records INTEGER NOT NULL DEFAULT 0,
    success_count INTEGER NOT NULL DEFAULT 0,
    error_count INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, processing, completed, failed
    upload_mode VARCHAR(20) DEFAULT 'append', -- append ou overwrite
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    error_message TEXT
);

-- Índice para consultas rápidas por status
CREATE INDEX IF NOT EXISTS idx_upload_status ON upload_progress(status);

-- Índice para consultas por data
CREATE INDEX IF NOT EXISTS idx_upload_started ON upload_progress(started_at DESC);

-- Comentários da tabela
COMMENT ON TABLE upload_progress IS 'Rastreamento em tempo real do progresso de uploads e processamento de planilhas';
COMMENT ON COLUMN upload_progress.upload_id IS 'ID único do upload gerado pela API';
COMMENT ON COLUMN upload_progress.status IS 'Status atual: pending, processing, completed, failed';
COMMENT ON COLUMN upload_progress.processed_records IS 'Número de registros já processados';
COMMENT ON COLUMN upload_progress.total_records IS 'Total de registros a serem processados';
