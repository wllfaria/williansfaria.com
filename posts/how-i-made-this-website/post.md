Sempre fui uma pessoa muito interessada em diversos assuntos, principalmente envolvendo tecnologias. Por conta disso, eu acabo pesquisando, descobrindo e aprendendo novas tecnologias e até linguagens completamente diferentes. Além disso, também amo contar pra pessoas sobre qualquer coisinha que eu aprendo, é como se falar pra pessoas fizesse parte do meu processo de aprender. Esse foi o principal motivo pra eu criar esse pequeno blog, e também é o motivo pelo qual escrevo isso.

## Os desafios de criar um blog.
A ideia de criar o blog veio pela minha vontade de compartilhar com o mundo as coisas que eu aprendo, isso vocês já sabem, mas o que eu não sabia, e talvez vocês também não. É que nada é tão simples quanto parece. E é claro que dessa vez não seria diferente.

Eu tinha em mente que faria meu blog ser o mais simples possível, apenas um website gerado estáticamente com todas as postagens que eu escrever, e que eu faria melhorias conforme necessário, então foi fácil escolher NextJS pra construir toda a aplicação WEB.

Mas isso ainda deixou alguns pontos em aberto, principalmente como eu faria para adicionar, remover ou editar conteúdo do site. Pensei em inicialmente escrever todas as postagens como markdown no próprio repositório e usar alguma biblioteca pra converter esse markdown em HTML quando eu fizesse o deploy. Mas isso não parecia tão eficiente, eu teria que ter acesso ao repositório pra conseguir publicar uma nova postagem, já que o deploy seria executado apenas com o push.

Além de limitar bastante a forma com que posso colocar imagens. Enfim, num geral essa ideia limitaria muito as maneiras que eu poderia utilizar meu website.

Foi assim que eu comecei a buscar por soluções. E foi uma grande jornada visto que eu não conhecia muito esse mundo. Mas depois de alguma pesquisa, eu sabia o que precisava. Alguma plataforma para hospedagem de imagens em núvem, um CMS pra garantir que eu consiga criar postagens, e alguma espécie de integração pra conseguir enviar as postagens de qualquer lugar. Seja qual solução eu escolhesse, ela deveria cumprir com alguns critérios:
- Ser gratuita ou ter um custo super baixo;
- Ser flexível o suficiente pra que eu controle como eu uso;
- Garantir que eu consiga migrar meus dados caso eu queira;
- Não ser extremamente complexo para configurar.

## Soluções escolhidas.
Depois de toda a pesquisa, a stack de tecnologia escolhida foi: Strapi, Railway, Cloudinary, NextJS.

### Strapi
Usei o strapi como CMS, a própria documentação do strapi ensina a construir um blog utilizando a zona de administrador e explica de maneira super clara todos os passos pra criar um blog simples. A partir disso foi bem fácil extender o que aprendi e aplicar coisas mais específicas que eu queria fazer.

A interface de admin é fácil de usar, intuitiva e o setup de tudo não poderia ser mais simples, esse foi um dos grandes pontos que me convenceram a usar o strapi. Basta alguns comandos no terminal e você tem um CMS com painel de administrador completamente funcional.

### Railway
Eu não conhecia essa plataforma, mas fiquei impressionado com a facilidade de realizar o deploy do CMS em strapi. Eles possuem um template pronto que bastou conectar ao meu repositório, e em questão de minutos eu tinha um painel de administrador em ambiente de produção.

Além disso, fiquei ainda mais surpreso quando descobri que eles também tinham uma integração com o Cloudinary. Minha vida não poderia ser mais fácil nesse momento.

### Cloudinary
Eu ja tinha ouvido bastante sobre o Cloudinary, mas nunca tive a oportunidade de usar o serviço de cloud deles. O espaço é bem limitado no plano gratuito mas honestamente, a maioria dos meus artigos terão pouquissimas imagens, então eu não vejo problema.

A integração automatica com o Railway facilitou muito todo o processo, fazendo com que assim que o deploy fosse realizado, eu já tivesse uma hospedagem em cloud pra todas as imagens.

### NextJS (Vercel)
Eu escolhi a vercel pra fazer deploy do website pela facilidade e integração completa com o NextJS. O principal motivo aqui foi comodidade.


## Alguns detalhes importante
Existiram alguns desafios mais técnicos na criação desse website, especialmente na integração de i18n com a geração estática de websites (SSG) do Next. Mas eu ainda vou explicar como resolvi isso em um artigo único.

Obrigado por ler até aqui!
