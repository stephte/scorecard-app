Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :scorecards
      resources :courses, only: [:index, :show]
      # resources :players, only: [:create, :update, :destroy]
    end
  end

  get '*path', to: 'pages#index', via: :all
end
