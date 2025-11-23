-- Tabela para rastrear progresso da automação em tempo real
CREATE TABLE IF NOT EXISTS public.automation_progress (
    id SERIAL PRIMARY KEY,
    run_id VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'running',
    total_records INT DEFAULT 0,
    processed_records INT DEFAULT 0,
    success_count INT DEFAULT 0,
    error_count INT DEFAULT 0,
    skipped_count INT DEFAULT 0,
    started_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP NULL,
    is_complete BOOLEAN DEFAULT FALSE,
    error_message TEXT NULL
);

-- Tabela para registrar erros e permitir retry
CREATE TABLE IF NOT EXISTS public.automation_errors (
    id SERIAL PRIMARY KEY,
    run_id VARCHAR(255) NOT NULL,
    isrc VARCHAR(50) NOT NULL,
    artista VARCHAR(255),
    titulares VARCHAR(255),
    error_type VARCHAR(100),
    error_message TEXT,
    retry_count INT DEFAULT 0,
    max_retries INT DEFAULT 3,
    should_retry BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    retried_at TIMESTAMP NULL,
    resolved BOOLEAN DEFAULT FALSE
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_automation_progress_run_id ON public.automation_progress(run_id);
CREATE INDEX IF NOT EXISTS idx_automation_progress_status ON public.automation_progress(status);
CREATE INDEX IF NOT EXISTS idx_automation_errors_run_id ON public.automation_errors(run_id);
CREATE INDEX IF NOT EXISTS idx_automation_errors_isrc ON public.automation_errors(isrc);
CREATE INDEX IF NOT EXISTS idx_automation_errors_should_retry ON public.automation_errors(should_retry, resolved);

-- Comentários para documentação
COMMENT ON TABLE public.automation_progress IS 'Rastreia o progresso em tempo real da automação de cadastros';
COMMENT ON TABLE public.automation_errors IS 'Registra erros durante automação para permitir retry';
