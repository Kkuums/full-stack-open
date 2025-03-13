const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'Kristians Kums',
        username: 'Kristians',
        password: 'password',
      },
    })
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'Second User',
        username: 'second',
        password: 'password',
      },
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await loginWith(page, 'Kristians', 'password')
    await expect(page.getByText('Kristians Kums logged in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'Kristians', 'wrong')

    const notificationDiv = await page.locator('.notification')
    await expect(notificationDiv).toContainText('Wrong credentials')
    await expect(notificationDiv).toHaveCSS('border-style', 'solid')
    await expect(notificationDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('Kristians Kums logged in')).not.toBeVisible()
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'Kristians', 'password')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'A test title', 'playwright', 'www.playwright.dev')

      const blogDiv = await page.locator('.blog')
      await expect(blogDiv).toContainText('A test title by playwright')
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'A test title', 'playwright', 'www.playwright.dev')

      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('blog can be deleted by the user that created it', async ({ page }) => {
      await createBlog(page, 'A test title', 'playwright', 'www.playwright.dev')

      await page.getByRole('button', { name: 'view' }).click()

      await page.on('dialog', (dialog) => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()

      page.reload()

      await expect(page.getByText('A test title')).not.toBeVisible()
    })

    test('delete button not visible by second user', async ({ page }) => {
      await createBlog(page, 'A test title', 'playwright', 'www.playwright.dev')

      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'second', 'password')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('button', { name: 'view' }).click()

      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test('blogs are arranged in order according to number of likes', async ({
      page,
    }) => {
      await createBlog(page, 'First blog', 'playwright', 'www.playwright.dev')
      await createBlog(page, 'Second blog', 'playwright', 'www.playwright.dev')
      await createBlog(page, 'Third blog', 'playwright', 'www.playwright.dev')

      await page
        .locator('div.blog')
        .filter({ hasText: 'Third blog' })
        .getByRole('button', { name: 'view' })
        .click()

      await page
        .locator('div.blog')
        .filter({ hasText: 'Third blog' })
        .getByRole('button', { name: 'like' })
        .click()

      const blogs = page.locator('div.blog')

      await expect(blogs.nth(0)).toContainText('Third blog')
    })
  })
})
