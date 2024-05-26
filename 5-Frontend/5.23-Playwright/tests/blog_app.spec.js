//4.21 backend 5.12 front end

/*
const { test, expect } = require('@playwright/test')

test('front page can be opened', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const locator = await page.getByText('Notes')
  await expect(locator).toBeVisible()
  await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2023')).toBeVisible()
})
 */

const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    const backendURL = 'http://localhost:3003'
    const frontendURL = 'http://localhost:5173'
    beforeEach(async ({page}) => {
            /*
            await request.post(`${backendURL}/api/testing/reset`)
            await request.post(`${backendURL}/api/users`, {
                data: {
                    name: 'backendUserTest',
                    username: 'aUser',
                    password: 'aPassword'
                }
            }) //works but since I can only have 1 cluster I rather not delete all the data in it
            */
            await page.goto(`${frontendURL}`)
    })
    test('Login form is shown', async ({page}) => {
        await expect(page.getByText('Login Form')).toBeVisible()
    })


    describe('Login', () => {

        test('Login work Correctly', async ({page} ) => {
            await page.getByTestId('username').fill('Joe')
            await page.getByTestId('password').fill('password')
            await page.getByTestId('loginButton').click()
            await expect(page.getByRole('heading', { name: 'blogs' })).toBeVisible()
        })

        test('Login fail with wrong credentianls', async ({page}) => {
            await page.getByTestId('username').fill('aUsername')
            await page.getByTestId('password').fill('pw')
            await page.getByTestId('loginButton').click()
            await expect(page.getByRole('heading', { name: 'Login Form' })).toBeVisible()
        })

    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByTestId('username').fill('Joe')
            await page.getByTestId('password').fill('password')
            await page.getByTestId('loginButton').click()
        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', {name: 'new blog'}).click()
            await page.getByTestId('username').fill('aUsername')
            await page.getByTestId('author').fill('aAuthor')
            await page.getByTestId('url').fill('aUrl')
            await page.getByRole('button', { name: 'create' }).click()
            await expect(page.getByText('A new blog was added!')).toBeVisible()
        })

        test('a blog can be liked', async ({ page }) => {
            await page.getByRole('button', { name: 'view' }).first().click()
            await expect(page.getByRole('button', { name: 'Like!'})).toBeVisible()
        })

        test('a blog can be deleted', async ({ page }) => {
            await page.getByRole('button', { name: 'view' }).last().click()
            await page.getByRole('button', { name: 'Delete'}).click()
        })

        test('only author sees delete button', async ({ page }) => { //something wrong here

            await page.waitForSelector('[data-testid="aBlogPost"]')  // Waits for at least one blog post to be present
            for(const blog of await page.getByTestId('aBlogPost').all()){
                const viewButton = blog.getByRole('button', { name: 'view' })
                await viewButton.waitFor({ state: 'visible' }) // Ensure the button is visible
                await viewButton.click()

                const author = await blog.getByTestId('postAuthor').textContent()
                if(author === "aAuthor"){ //the author that we are logged in as
                     await expect(page.getByRole('button', {name: 'Delete'})).toBeVisible()
                }else{
                    //current version of frontend/backend allows anyone to delete , so comment this part out if want pass test!
                    await expect(page.getByRole('button', {name: 'Delete'})).toBeHidden()
                }
            }


        })


        test('Blogs arranged in order of likes', async  ({ page }) => {
            var prevLikeNumber = Infinity
            await page.waitForSelector('[data-testid="aBlogPost"]')  // Waits for at least one blog post to be present
            for(const blog of await page.getByTestId('aBlogPost').all()){
                const viewButton = blog.getByRole('button', { name: 'view' })
                await viewButton.waitFor({ state: 'visible' }) // Ensure the button is visible
                await viewButton.click()

                const numLikes = parseInt((await blog.getByTestId('postLikes').textContent()).slice(8))

                await expect(numLikes <= prevLikeNumber).toBeTruthy
                prevLikeNumber = numLikes


            }


        })
    })

})