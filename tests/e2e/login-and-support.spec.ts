import { expect, test, type Page } from "@playwright/test";

const plannerEmail = "bia@planejador.com";
const inspectorEmail = "alexandre@teste.com";
const testPassword = "12345678"

test.describe("Página de acesso", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
});
async function fillLogin(page: Page, email: string) {
  await page.getByLabel("E-mail", { exact: true }).fill(email);
  await page.getByLabel("Senha", { exact: true }).fill(testPassword);
  await page.getByRole("button", { name: "Entrar" }).click();
}

test.describe("Tela de login", () => {

  test("exibe identidade, formulário, ícones e favicon", async ({ page, request }) => {
    await expect(page).toHaveTitle("Gestão Armony");
    await expect(page.getByRole("heading", { name: "Gestão Armony" })).toBeVisible();
    await expect(page.getByText("Obras, medição e instalação")).toBeVisible();
    await expect(page.locator("form").locator("xpath=..")).toHaveClass(/bg-white/);
    await expect(page.getByText("E-mail", { exact: true })).toBeVisible();
    await expect(page.getByLabel("E-mail", { exact: true })).toHaveAttribute("placeholder", "name@company.com");
    await expect(page.locator("#login-email").locator("xpath=..").locator("svg.lucide-mail")).toHaveCount(1);
    await expect(page.getByText("Senha", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Senha", { exact: true })).toHaveAttribute("placeholder", "••••••••");
    await expect(page.locator("#login-password").locator("xpath=..").locator("svg.lucide-lock")).toHaveCount(1);
    await expect(page.getByRole("button", { name: "Mostrar senha" }).locator("svg.lucide-eye")).toHaveCount(1);
    await expect(page.getByRole("link", { name: "Esqueceu sua senha?" })).toBeVisible();

    const favicon = page.locator('link[rel="icon"]');
    await expect(favicon).toHaveAttribute("href", "/favicon.svg");
    await expect((await request.get("/favicon.svg")).status()).toBe(200);
  });

  test("mostra e oculta a senha pelo botão do olho", async ({ page }) => {
    const password = page.getByLabel("Senha", { exact: true });
    const visibilityButton = page.getByRole("button", { name: "Mostrar senha" });

    await password.fill("abcd");
    await expect(password).toHaveAttribute("type", "password");
    await visibilityButton.click();
    await expect(password).toHaveAttribute("type", "text");
    await expect(page.getByRole("button", { name: "Ocultar senha" })).toBeVisible();
    await page.getByRole("button", { name: "Ocultar senha" }).click();
    await expect(password).toHaveAttribute("type", "password");
  });

  test("exibe mensagem para credenciais inválidas", async ({ page }) => {
    await page.getByLabel("E-mail", { exact: true }).fill("usuario-inexistente@example.com");
    await page.getByLabel("Senha", { exact: true }).fill("senha-invalida");
    await page.getByRole("button", { name: "Entrar" }).click();
    await expect(page.getByText("Erro ao realizar login.")).toBeVisible({ timeout: 15000 });
  });
});

test.describe("Esqueci minha senha", () => {
  test("navega para /esquecer e exibe canais clicáveis", async ({ page }) => {
    await page.getByRole("link", { name: "Esqueceu sua senha?" }).click();

    await expect(page).toHaveURL(/\/esquecer$/);
    await expect(page.getByRole("heading", { name: "Esqueceu sua senha?" })).toBeVisible();
    await expect(page.getByText("Entre em contato com o suporte por um dos canais abaixo para recuperar o acesso.")).toBeVisible();

    const email = page.getByRole("link", { name: /E-mail gabrielao8@hotmail\.com/ });
    const whatsapp = page.getByRole("link", { name: /WhatsApp \(81\) 97901-0538/ });
    await expect(email).toHaveAttribute("href", "mailto:gabrielao8@hotmail.com");
    await expect(whatsapp).toHaveAttribute("href", "https://wa.me/5581979010538");
    await expect(email.locator("svg")).toBeVisible();
    await expect(whatsapp.locator("svg")).toBeVisible();
  });
});

test.describe("Rotas protegidas e perfis", () => {
  for (const path of ["/planejador", "/inspetor", "/planejador/agenda"]) {
    test(`bloqueia acesso sem autenticação: ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveURL(/\/$/);
      await expect(page.getByRole("heading", { name: "Gestão Armony" })).toBeVisible();
    });
  }

  test("autentica Planejador e libera painel e agenda", async ({ page }) => {
    await fillLogin(page, plannerEmail);
    await expect(page).toHaveURL(/\/planejador$/, { timeout: 15000 });
    await expect(page.getByRole("heading", { name: "Planejamento de Obras" })).toBeVisible();
    await page.getByRole("button", { name: "Acessar agenda" }).click();
    await expect(page).toHaveURL(/\/planejador\/agenda$/);
  });

  test("autentica Inspetor e libera sua agenda", async ({ page }) => {
    await fillLogin(page, inspectorEmail);
    await expect(page).toHaveURL(/\/inspetor$/, { timeout: 15000 });
    await expect(page.getByRole("heading", { name: "Agenda de Vistorias" })).toBeVisible();
  });
});
});
