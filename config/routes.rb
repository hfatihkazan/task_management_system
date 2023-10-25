Rails.application.routes.draw do
  resource :users do
    get 'developers'
  end
  resources :tasks
  post "tasks/initialize_or_update", to:"tasks#initialize_or_update"
  post 'login', to: "authentication#login"
  root 'pages#home'
  get '*path', to: 'pages#home', via: :all
end
