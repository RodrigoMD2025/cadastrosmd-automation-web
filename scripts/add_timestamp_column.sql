-- Adiciona coluna de timestamp para registrar quando foi cadastrado
-- Execute este script no Neon Dashboard SQL Editor

-- Adiciona a coluna se não existir
ALTER TABLE public.cadastros 
ADD COLUMN IF NOT EXISTS cadastrado_em TIMESTAMP;

-- Cria índice para melhor performance em consultas ordenadas
CREATE INDEX IF NOT EXISTS idx_cadastros_cadastrado_em 
ON public.cadastros(cadastrado_em DESC);

-- Comentário na coluna
COMMENT ON COLUMN public.cadastros.cadastrado_em IS 'Data e hora em que o registro foi cadastrado no sistema';
