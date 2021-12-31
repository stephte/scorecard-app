module Api
  module V1
    class CoursesController < ApplicationController
      protect_from_forgery with: :null_session

      def index
        courses = Course.all

        render json: courses.to_json(only: [:id, :name])
      end

    end
  end
end
