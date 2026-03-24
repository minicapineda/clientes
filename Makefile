PROJECT_NAME=clientes
SERVICE=clientes
COMPOSE=docker compose

.PHONY: help dev stop restart logs shell add lint format check build clean

ayuda:
	@echo ""
	@echo "🚀 Comandos disponibles – Frontend"
	@echo ""
	@echo "DEV:"
	@echo "  make dev                 Levanta el frontend (Vite en Docker)"
	@echo "  make stop                Detiene el contenedor"
	@echo "  make restart             Reinicia el contenedor"
	@echo "  make logs                Ver logs del frontend"
	@echo "  make shell               Entrar al contenedor"
	@echo ""
	@echo "CALIDAD:"
	@echo "  make lint                Ejecutar Biome lint"
	@echo "  make format              Ejecutar Biome format"
	@echo "  make check               Biome check (lint + format)"
	@echo ""
	@echo "PRODUCCIÓN:"
	@echo "  make build               Verifica errores en el código"
	@echo ""
	@echo "UTILIDADES:"
	@echo "  make clean               Detiene contenedores y borra volúmenes"
	@echo ""

install:
	cd src && pnpm install

serve:
	$(COMPOSE) run --rm $(SERVICE) pnpm run build
	$(COMPOSE) up -d

dev:
	$(COMPOSE) up -d --build

stop:
	$(COMPOSE) down

restart:
	$(COMPOSE) restart $(SERVICE)

logs:
	$(COMPOSE) logs -f $(SERVICE)

shell:
	$(COMPOSE) exec $(SERVICE) sh

build:
	cd src && pnpm run build

clean:
	$(COMPOSE) down -v