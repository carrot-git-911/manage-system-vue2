# Vue2 后台管理系统登录页面设计方案

## 1. 总体设计思路

基于提供的原型图，登录页面采用经典的双栏布局：

- **左侧栏 (Branding/Promotion):** 占据页面约一半的宽度，用于展示品牌信息、欢迎语和装饰性背景图，营造专业的企业形象。
- **右侧栏 (Login Form):** 占据页面另一半的宽度，提供用户登录的核心功能区域，包含 Logo、标题、输入表单和操作链接。

整体布局将使用 Flexbox 实现，确保在不同屏幕尺寸下的良好适应性。

## 2. 技术选型

- **布局:** CSS Flexbox
- **UI 组件库:** Element UI (基于现有项目结构推断)
- **结构:** Vue 单文件组件 (`.vue`)

## 3. 页面结构方案

### 3.1. 主体结构 (HTML)

```html
<div class="login-container">
  <!-- 左侧品牌展示区域 -->
  <div class="login-left">
    <div class="left-content">
      <h1>Welcome to Shipla ERP System</h1>
      <p>Cloud warehouse network covering South East Asia</p>
      <div class="illustration">
        <!-- 背景装饰图 -->
      </div>
    </div>
  </div>

  <!-- 右侧登录表单区域 -->
  <div class="login-right">
    <div class="right-content">
      <!-- 语言切换 -->
      <div class="lang-switcher">
        <!-- Element UI Dropdown -->
      </div>
      
      <!-- 登录表单 -->
      <div class="login-form-wrapper">
        <div class="logo">
          <img src="@/assets/logo.png" alt="Shipla">
        </div>
        <h2>登录Shipla ERP 后台管理系统</h2>
        
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
          <!-- 手机号输入 -->
          <el-form-item prop="phone">
            <el-input v-model="loginForm.phone" placeholder="请输入手机号">
              <el-select v-model="countryCode" slot="prepend" placeholder="请选择">
                <el-option label="+86" value="+86"></el-option>
                <!-- 其他国家代码 -->
              </el-select>
            </el-input>
          </el-form-item>
          
          <!-- 密码输入 -->
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          
          <!-- 隐私协议 -->
          <div class="privacy-agreement">
            登录即代表同意《隐私协议》
          </div>
          
          <!-- 登录按钮 -->
          <el-form-item>
            <el-button type="primary" @click="handleLogin" style="width: 100%;">登录</el-button>
          </el-form-item>
        </el-form>
        
        <!-- 底部链接 -->
        <div class="form-footer">
          <el-link type="primary">还没有Shipla ERP账号?免费注册</el-link>
          <el-link type="primary">忘记密码?</el-link>
        </div>
      </div>
      
      <!-- 页面底部信息 -->
      <div class="page-footer">
        <span>京ICP备12345678号-1</span>
        <span>京公网安备12345678号</span>
      </div>
    </div>
  </div>
</div>
```

### 3.2. 样式 (CSS/Less) 方案

- **`.login-container`**:
  - 使用 `display: flex` 创建双栏布局。
  - 高度和宽度均设置为 `100vh` 和 `100vw`，使其占满整个视口。

- **`.login-left`**:
  - 使用 `flex: 1` (或固定宽度) 分配空间。
  - 设置原型图中的蓝色渐变背景 (`background`)。
  - 内部内容使用 Flexbox 垂直和水平居中。
  - 字体颜色设置为白色。

- **`.login-right`**:
  - 使用 `flex: 1` (或固定宽度) 分配空间。
  - 设置白色背景。
  - 内部内容 (`.right-content`) 同样使用 Flexbox 进行布局，主轴方向设置为 `column`，并实现垂直方向上的空间分布 (`justify-content: space-between`) 和水平居中 (`align-items: center`)。

- **`.login-form-wrapper`**:
  - 设置最大宽度 (`max-width`) 以保证表单在宽屏上不会过分拉伸，例如 `400px`。
  - 文本居中 (`text-align: center`)。

- **`.lang-switcher`**:
  - 使用绝对定位 (`position: absolute`) 将其放置在右上角。

- **`.page-footer`**:
  - 放置在右侧栏的底部，可以设置一个固定的 `margin-bottom`。

## 4. 组件实现要点

- **手机号输入框**: 使用 Element UI 的 `el-input` 组件，并通过 `slot="prepend"` 插入一个 `el-select` 组件来实现国家/地区代码的选择功能。
- **密码输入框**: 使用 `el-input` 并设置 `type="password"` 和 `show-password` 属性，以提供密码可见性切换功能。
- **表单校验**: 为 `el-form` 定义 `rules`，对手机号和密码进行非空等基本校验。
- **语言切换**: 使用 `el-dropdown` 组件，在点击时显示不同语言选项。

此方案提供了一个清晰的、可执行的实现路径，开发人员可根据此方案快速搭建出符合原型图设计的登录页面。
