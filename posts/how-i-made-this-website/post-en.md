I have always been someone deeply interested in various subjects, particularly those related to technology. As a result, I find myself constantly researching, discovering, and learning about new technologies and even completely different programming languages. Additionally, I love sharing whatever little nuggets of knowledge I acquire with people, as if conveying these learnings is an integral part of my own learning process. This was the primary motivation behind the creation of this small blog, and it is also the reason why I am writing this.

## The Challenges of Creating a Blog
The idea of creating the blog stemmed from my desire to share with the world the things I learn. You already know that, but what I didn't know, and perhaps you didn't either, is that nothing is as straightforward as it seems. And, of course, this time was no different.

I envisioned keeping my blog as simple as possible, just a statically generated website with all the posts I write, with improvements made as necessary. Therefore, it was easy to choose NextJS to build the entire web application.

However, this left some aspects unresolved, particularly how I would add, remove, or edit site content. I initially thought about writing all the posts as markdown in the repository itself and using a library to convert this markdown to HTML when deploying. But that didn't seem very efficient; I would need access to the repository to publish a new post since the deployment would only occur with a push.

It also significantly limited how I could incorporate images. Overall, this idea would greatly restrict the ways I could use my website.

That's when I began searching for solutions. It was quite a journey, given my limited knowledge in this area. But after some research, I knew what I needed: some cloud hosting platform for images, a CMS to ensure I could create posts, and some form of integration to allow me to send posts from anywhere. Whatever solution I chose had to meet several criteria:

- Be free or have a very low cost
- Be flexible enough for me to control how I use it
- Ensure that I could migrate my data if necessary
- Not be overly complex to configure
- Chosen Solutions
- After all the research, the chosen technology stack was: Strapi, Railway, Cloudinary, NextJS.

### Strapi
I used Strapi as the CMS; Strapi's documentation itself teaches how to build a blog using the admin zone and explains in a clear manner all the steps to create a simple blog. From there, it was easy to build upon what I had learned and implement more specific things I wanted to do.

The admin interface is user-friendly, intuitive, and setting everything up couldn't have been simpler. This was one of the main factors that convinced me to use Strapi. A few terminal commands and you have a fully functional CMS with an admin panel.

### Railway
I was not familiar with this platform, but I was impressed by how easy it was to deploy the Strapi CMS. They have a ready-made template that only required connecting to my repository, and within minutes, I had an admin panel in a production environment.

Moreover, I was even more surprised when I discovered that they also had integration with Cloudinary. My life couldn't have been easier at that moment.

### Cloudinary
I had heard a lot about Cloudinary, but I had never had the opportunity to use their cloud service. Space is quite limited in the free plan, but honestly, most of my articles will have very few images, so I don't see a problem.

The automatic integration with Railway greatly facilitated the entire process, ensuring that as soon as the deployment was done, I had cloud hosting for all the images.

### NextJS (Vercel)
I chose Vercel to deploy the website because of the ease and seamless integration with NextJS. The main reason here was convenience.

## Some Important Details
There were some more technical challenges in creating this website, especially in integrating i18n with Next's static site generation (SSG). But I will explain how I solved this in a separate article.

Thank you for reading this far!
