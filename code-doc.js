function generateCodeBlock(data) {
  const codeContent = data.lines
    .map((line) => {
      // Replace placeholders with actual HTML tags
      return line.replace(/<(\w+)>(.*?)<\/\1>/g, (_, tag, content) => {
        switch (tag) {
          case "keyword":
            return `<span class="keyword">${content}</span>`;
          case "string":
            return `<span class="string">${content}</span>`;
          case "attr":
            return `<span class="hljs-attr">${content}</span>`;
          default:
            return content;
        }
      });
    })
    .join("\n");

  return `
    <div class="docs-code-block code-block" ${data.attribute}>
        <pre class="shadow-lg rounded"><code class="json hljs">
${codeContent}
        </code></pre>
    </div>
    `;
}

const codeData = {
  "welcome-route": {
    attribute: "named-route",
    lines: [
      "    <attr>use \\</attr><string>Core\\Router</string>;",
      "",
      "    <keyword>Router::get</keyword>(<string>'/welcome'</string>, <keyword>function</keyword> () {",
      "    <keyword>return</keyword> <string>'Welcome to ArcanePHP!'</string>;",

      "    });",
    ],
  },
  "named-route": {
    attribute: "another-code-snippet",
    lines: [
      "    <attr>use \\</attr><string>Core\\Router</string>;",
      "",
      "    <keyword>Router::get</keyword>(<string>'/dashboard'</string>, <keyword>function</keyword> () {",
      "    <keyword>return</keyword> <string>'Welcome to your dashboard!'</string>;",

      "    })-><keyword>callAs('dashboard_page')</keyword>;",
      "",
      "",
      "    // Generating a URL for the named route",
      "   <keyword> $url</keyword> = <string> getUrl('dashboard_page')</string>;",
    ],
  },
  "group-route": {
    attribute: "another-code-snippet",
    lines: [
      "    <attr>use \\</attr><string>Core\\Router</string>;",
      "    <attr>use \\</attr><string>App\\Middleware\\AuthMiddleware</string>;",

      "",
      "    <keyword>Router::group</keyword>( <keyword>function</keyword> () {",
      "   ",
      "      <keyword>Router::get(<string>'/dashboard'</string>,</keyword> <keyword>function(){</keyword>",
      "            <keyword>return</keyword> <string>'dashboard'</string> ;",
      "       })-><keyword>callAs('dashboard_page')</keyword>;",
      "  ",
      "   ",
      "      <keyword>Router::get(<string>'/settings'</string>,</keyword> <keyword>function(){</keyword>",
      "            <keyword>return</keyword> <string>'settings'</string> ;",
      "       })-><keyword>callAs('admin_settings')</keyword>;",
      "  ",
      "   },<keyword>middleware:AuthMiddleware::class</keyword>);",
    ],
  },
  "middleware-route": {
    attribute: "another-code-snippet",
    lines: [
      "    <attr>use \\</attr><string>Core\\Router</string>;",
      "    <attr>use \\</attr><string>App\\Middleware\\Authenticate</string>;",

      "",
      "   ",
      "      <keyword>Router::get(<string>'/dashboard'</string>,</keyword> <keyword>function(){</keyword>",
      "            <keyword>return</keyword> <string>'dashboard'</string> ;",
      "       },<keyword>middleware</keyword>:<keyword>Authenticate</keyword>)-><keyword>callAs('dashboard_page')</keyword>;",
    ],
  },
  csrf: {
    attribute: "another-code-snippet",
    lines: [
      "      <keyword>&lt;form&gt;</keyword>",
      "            <string>{{csrf()}}</string>",
      "      <keyword>&lt;/form&gt;</keyword>",
      "",
      "      //or",
      "",
      "      <keyword>&lt;div class='product-card' &gt;</keyword>",
      "       <string>{{csrf()}}</string>",
      "      <keyword>&lt;/div&gt;</keyword>",
    ],
  },
  "make-controller": {
    attribute: "another-code-snippet",
    lines: [
      "",
      "      <keyword>./project</keyword><string> create-controller-HomeController</string>",
    ],
  },
  "basic-controller": {
    attribute: "controller-code",
    lines: [
      "    <attr>namespace </attr><string>App\\Controllers</string>;",
      "    ",
      "    <attr>use </attr><string>\\Core\\Controller</string>;",
      "",
      "    <keyword>class</keyword> <class-name>HomeController</class-name> <keyword>extends</keyword> <class-name>Controller</class-name>",
      "    {",
      "        <keyword>public function</keyword> <function-name>index</function-name>()",
      "        {",
      "            <keyword>return</keyword> <string>'Welcome to the Home Page!'</string>;",
      "        }",
      "    }",
    ],
  },
  "defining-routes-with-controllers": {
    attribute: "controller-route-code",
    lines: [
      "    <attr>use </attr><string>\\Core\\Router</string>;",
      "    <attr>use </attr><string>\\App\\Controllers\\HomeController</string>;",
      "",
      "    <keyword>Router::get</keyword>(<string>'/home'</string>)-><keyword>to</keyword>(<keyword>HomeController::Class</keyword>,<string>'index'</string>);",
      "",
      "     //or",
      "",
      "    <keyword>Router::get</keyword>(<string>'/home'</string>, [ <string>'::index'</string>,<keyword>HomeController::class</keyword>]);",
    ],
  },
  "controller-actions": {
    attribute: "controller-actions-code",
    lines: [
      "    <attr>namespace </attr><string>App\\Controllers</string>;",
      "    ",
      "    <attr>use </attr><string>\\Core\\Controller</string>;",
      "",
      "    <keyword>class</keyword> <class-name>UserController</class-name> <keyword>extends</keyword> <class-name>Controller</class-name>",
      "    {",
      "        <keyword>public function</keyword> <function-name>profile</function-name>(<param>$user_id</param>)",
      "        {",
      "            <keyword>return</keyword> <string>'User Profile: '</string>.<param>$user_id</param>;",
      "        }",
      "",
      "        <keyword>public function</keyword> <function-name>settings</function-name>()",
      "        {",
      "            <keyword>return</keyword> <string>'User Settings'</string>;",
      "        }",
      "    }",
    ],
  },
  "controller-route-mapping": {
    attribute: "controller-route-mapping-code",
    lines: [
      "    <attr>use </attr><string>\\Core\\Router</string>;",
      "    <attr>use </attr><string>\\App\\Controllers\\UserController</string>",
      "",
      "    <keyword>Router::get</keyword>(<string>'/user/{user_id}'</string>)-><keyword>to</keyword>(<keyword>UserController::Class</keyword>,<string>'profile'</string>);",
      "    <keyword>Router::get</keyword>(<string>'/user/settings'</string>)-><keyword>to</keyword>(<keyword>UserController::Class</keyword>,<string>'settings'</string>);",
    ],
  },
  "restful-controller": {
    attribute: "restful-controller-code",
    lines: [
      "    <attr>namespace </attr><string>App\\Controllers</string>;",
      "    ",
      "    <attr>use </attr><string>\\Core\\Controller</string>;",
      "",
      "    <keyword>class</keyword> <class-name>PostController</class-name> <keyword>extends</keyword> <class-name>Controller</class-name>",
      "    {",
      "        <keyword>public function</keyword> <function-name>index</function-name>()",
      "        {",
      "            <keyword>return</keyword> <string>'List of posts'</string>;",
      "        }",
      "",
      "        <keyword>public function</keyword> <function-name>show</function-name>(<param>$post_id</param>)",
      "        {",
      "            <keyword>return</keyword> <string>'Displaying post with ID: '</string>.<param>$post_id</param>;",
      "        }",
      "",
      "        <keyword>public function</keyword> <function-name>create</function-name>()",
      "        {",
      "            <keyword>return</keyword> <string>'Create a new post'</string>;",
      "        }",
      "",
      "        <keyword>public function</keyword> <function-name>store</function-name>()",
      "        {",
      "            <comment>// Logic to store a new post</comment>",
      "            <keyword>return</keyword> <string>'Post created successfully'</string>;",
      "        }",
      "",
      "        <keyword>public function</keyword> <function-name>edit</function-name>(<param>$post_id</param>)",
      "        {",
      "            <keyword>return</keyword> <string>'Edit post with ID: '</string>.<param>$post_id</param>;",
      "        }",
      "",
      "        <keyword>public function</keyword> <function-name>update</function-name>(<param>$post_id</param>)",
      "        {",
      "            <comment>// Logic to update the post</comment>",
      "            <keyword>return</keyword> <string>'Post with ID: '</string>.<param>$post_id</param>.<string>' updated successfully'</string>;",
      "        }",
      "",
      "        <keyword>public function</keyword> <function-name>destroy</function-name>(<param>$post_id</param>)",
      "        {",
      "            <comment>// Logic to delete the post</comment>",
      "            <keyword>return</keyword> <string>'Post with ID: '</string>.<param>$post_id</param>.<string>' deleted successfully'</string>;",
      "        }",
      "    }",
    ],
  },
  "restful-route-mapping-short": {
    attribute: "restful-route-mapping-code",
    lines: [
      "    <attr>use </attr><string>\\Core\\Router</string>;",
      "    <attr>use </attr><string>\\App\\Controllers\\PostController</string>;",
      "",
      "    <keyword>Router::crud</keyword>(<keyword>PostController::class</keyword>);",
    ],
  },
  "restful-route-mapping": {
    attribute: "restful-route-mapping-code",
    lines: [
      " <attr>use </attr><string>\\Core\\Router</string>;",
      "",
      " <keyword>Router::group</keyword>(<keyword>function</keyword> () {",
      "     <keyword>Router::get</keyword>(<string>'/posts'</string>)-><keyword>action</keyword>(<string>'index'</string>);",
      "     <keyword>Router::get</keyword>(<string>'/posts/{post_id}'</string>)-><keyword>action</keyword>(<string>'show'</string>);",
      "     <keyword>Router::get</keyword>(<string>'/posts/create'</string>)-><keyword>action</keyword>(<string>'create'</string>);",
      "     <keyword>Router::post</keyword>(<string>'/posts'</string>)-><keyword>action</keyword>(<string>'store'</string>);",
      "     <keyword>Router::get</keyword>(<string>'/posts/{post_id}/edit'</string>)-><keyword>action</keyword>(<string>'edit'</string>);",
      "     <keyword>Router::put</keyword>(<string>'/posts/{post_id}'</string>)-><keyword>action</keyword>(<string>'update'</string>);",
      "     <keyword>Router::delete</keyword>(<string>'/posts/{post_id}'</string>)-><keyword>action</keyword>(<string>'destroy'</string>);",
      " }, <keyword>controller:</keyword> <string>PostController::class</string>);",
    ],
  },
  "middleware-controller": {
    attribute: "middleware-controller-code",
    lines: [
      "    <attr>namespace </attr><string>App\\Controllers</string>;",
      "    ",
      "    <attr>use </attr><string>\\Core\\Controller</string>;",
      "",
      "    <keyword>class</keyword> <class-name>DashboardController</class-name> <keyword>extends</keyword> <class-name>Controller</class-name>",
      "    {",
      "        <keyword>public function</keyword> <function-name>__construct</function-name>()",
      "        {",
      "            <keyword>this</keyword>-><function-call>middleware</function-call>(<string>'auth'</string>);",
      "        }",
      "",
      "        <keyword>public function</keyword> <function-name>index</function-name>()",
      "        {",
      "            <keyword>return</keyword> <string>'Welcome to your dashboard!'</string>;",
      "        }",
      "    }",
    ],
  },
  "dependency-injection": {
    attribute: "dependency-injection-code",
    lines: [
      "    <attr>namespace </attr><string>App\\Controllers</string>;",
      "    ",
      "    <attr>use </attr><string>\\Core\\Controller</string>;",
      "    <attr>use </attr><string>\\App\\Services\\UserService</string>;",
      "",
      "    <keyword>class</keyword> <class-name>ProfileController</class-name> <keyword>extends</keyword> <class-name>Controller</class-name>",
      "    {",
      "        <keyword>protected</keyword> <property-name>$userService</property-name>;",
      "",
      "        <keyword>public function</keyword> <function-name>__construct</function-name>(<class-name>UserService</class-name> <param>$userService</param>)",
      "        {",
      "            <keyword>this</keyword>-><property-name>userService</property-name> = <param>$userService</param>;",
      "        }",
      "",
      "        <keyword>public function</keyword> <function-name>show</function-name>(<param>$post_id</param>)",
      "        {",
      "            <variable>$user</variable> = <keyword>this</keyword>-><property-name>userService</property-name>-><function-call>find</function-call>(<param>$post_id</param>);",
      "            <keyword>return</keyword> <string>'User Name: '</string>.<variable>$user</variable>-><property-name>name</property-name>;",
      "        }",
      "    }",
    ],
  },
  "accessing-request-data": {
    attribute: "accessing-request-data-code",
    lines: [
      "    <attr>namespace </attr><string>App\\Controllers</string>;",
      "    <attr>use </attr><string>\\Core\\Controller</string>;",
      "    <attr>use </attr><string>\\Core\\Request</string>;",
      "",
      "      <keyword>class</keyword> <class-name>ExampleController</class-name> <keyword>extends</keyword> <class-name>Controller</class-name>",
      "  {",
      "        <keyword>public function</keyword> <function-name>handleRequest</function-name>(Requiest $request)",
      "        {",
      "        <keyword>$name</keyword> = <keyword>$request</keyword>-><function-call>input</function-call>(<string>'name'</string>);",
      "       }",
      "  }",
    ],
  },
  "retrieving-input-data": {
    attribute: "retrieving-input-data-code",
    lines: [
      "   <attr>namespace </attr><string>App\\Controllers</string>;",
      "   <attr>use </attr><string>\\Core\\Controller</string>;",
      "   <attr>use </attr><string>\\Core\\Request</string>;",
      "",
      "   <keyword>class</keyword> <class-name>InputController</class-name> <keyword>extends</keyword> <class-name>Controller</class-name>",
      "   {",
      "    <keyword>public function</keyword> <function-name>getInputData</function-name>(Request $request)",
      "    {",
      "        <keyword>$email</keyword> = <keyword>$request</keyword>-><function-call>input</function-call>(<string>'email'</string>);",
      "        <keyword>$allInputs</keyword> = <keyword>$request</keyword>-><function-call>all</function-call>();",
      "    }",
      "   }",
    ],
  },
  "handling-query-parameters": {
    attribute: "handling-query-parameters-code",
    lines: [
      "   <attr>namespace </attr><string>App\\Controllers</string>;",
      "   <attr>use </attr><string>\\Core\\Controller</string>;",
      "   <attr>use </attr><string>\\Core\\Request</string>;",
      "",
      "   <keyword>class</keyword> <class-name>QueryController</class-name> <keyword>extends</keyword> <class-name>Controller</class-name>",
      "   {",
      "    <keyword>public function</keyword> <function-name>getQueryParameter</function-name>()",
      "    {",
      "        <keyword>$request</keyword> = <attr>new</attr> <class-name>Request</class-name>();",
      "        <keyword>$page</keyword> = <keyword>$request</keyword>-><function-call>query</function-call>(<string>'page'</string>);",
      "    }",
      "   }",
    ],
  },

  "ajax-example": {
    attribute: "ajax-syntax",
    lines: [
      "    Router::post('post/delete/{post_id}')",
      "    ->to(PostController::class, 'destroy')",
      "    ->callAs('delete_post');",
    ],
  },
  "ajax-html-form": {
    attribute: "ajax-html",
    lines: [
      "     {{ for(posts,'",
      "       {{csrf()}}",
      '          <div class="post-card" data-post-id="{{ item.id }}">',
      '           &lt;div&gt;button class="post-delete-btn" > Delete Post &lt;div&gt;/button>',
      "          </div>",
      "    ') }}",
    ],
  },
  "file-uploads": {
    attribute: "file-uploads-code",
    lines: [
      "   <attr>namespace </attr><string>App\\Controllers</string>;",
      "   <attr>use </attr><string>\\Core\\Controller</string>;",
      "   <attr>use </attr><string>\\Core\\Request</string>;",
      "",
      "   <keyword>class</keyword> <class-name>FileUploadController</class-name> <keyword>extends</keyword> <class-name>Controller</class-name>",
      "   {",
      "    <keyword>public function</keyword> <function-name>handleFileUpload</function-name>()",
      "    {",
      "        <keyword>$request</keyword> = <attr>new</attr> <class-name>Request</class-name>();",
      "        <keyword>$file</keyword> = <keyword>$request</keyword>-><function-call>file</function-call>(<string>'profile_picture'</string>);",
      "        <keyword>if</keyword> (<keyword>$file</keyword>-><function-call>isValid</function-call>()) {",
      "           <keyword>$file</keyword>-><function-call>move</function-call>(<string>'uploads'</string>);",
      "        }",
      "    }",
      "   }",
    ],
  },
  "redirecting-requests": {
    attribute: "redirecting-requests-code",
    lines: [
      "   <attr>namespace </attr><string>App\\Controllers</string>;",
      "   <attr>use </attr><string>\\Core\\Controller</string>;",
      "   <attr>use </attr><string>\\Core\\View</string>;",
      "",
      "   <keyword>class</keyword> <class-name>RedirectController</class-name> <keyword>extends</keyword> <class-name>Controller</class-name>",
      "   {",
      "    <keyword>public function</keyword> <function-name>redirectToHome</function-name>()",
      "    {",
      "        <keyword>View::redirect</keyword>(<string>'/home'</string>);",
      "    }",
      "   }",
    ],
  },
};

function populateDivs() {
  Object.keys(codeData).forEach((key) => {
    const div = document.querySelector(`div[json-${key}]`);
    if (div) {
      div.outerHTML = generateCodeBlock(codeData[key]);
    }
  });
}

// Call this function when the DOM is loaded
document.addEventListener("DOMContentLoaded", populateDivs);
