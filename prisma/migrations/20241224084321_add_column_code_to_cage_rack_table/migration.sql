CREATE OR REPLACE FUNCTION extract_numeric_code(name text)
RETURNS int AS $$
BEGIN
RETURN CAST(NULLIF(regexp_replace(name, '\D', '', 'g'), '') AS int);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- AlterTable
ALTER TABLE "CageRack" ADD COLUMN code int GENERATED ALWAYS AS (extract_numeric_code("name")) STORED;

