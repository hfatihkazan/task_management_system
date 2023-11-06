class TasksController < ApplicationController
  before_action :set_task, only: %i[ show edit update destroy ]
  before_action :authorize_request

  # GET /tasks or /tasks.json
  def index
    @tasks = Task.all
    render json: @tasks, status: :ok
  end

  # GET /tasks/1 or /tasks/1.json
  def show
  end

  # GET /tasks/new
  def new
    @task = Task.new
  end

  # GET /tasks/1/edit
  def edit
  end

  # POST /tasks or /tasks.json
  def create
    @task = Task.new(task_params)

    respond_to do |format|
      if @task.save
        format.html { redirect_to task_url(@task), notice: "Task was successfully created." }
        format.json { render :show, status: :created, location: @task }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tasks/1 or /tasks/1.json
  def update
    respond_to do |format|
      if @task.update(task_params)
        format.html { redirect_to task_url(@task), notice: "Task was successfully updated." }
        format.json { render :show, status: :ok, location: @task }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tasks/1 or /tasks/1.json
  def destroy
    @task.destroy

    respond_to do |format|
      format.html { redirect_to tasks_url, notice: "Task was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def initialize_or_update
    task_obj = task_params
    if task_obj["user_id"].to_i == -1
      task_obj["user_id"] = find_available_developer
    end

    if task_obj["id"].present?
      task = Task.find(task_obj["id"].to_i)
      task.update(task_obj)
    else
      task = Task.new(task_obj)
      task.save
    end
    render json: { status: 200, task: task }
  end

  private

    def find_available_developer
      user_availability = []
      User.where(role:0).each do |user|
        total_task_point = 0
        begin
          user.tasks.where.not(status:2).select(:story_point).each do |task|
            total_task_point += task.story_point
          end
          user_availability.push(
            {
              user_id: user.id,
              availability: total_task_point.to_f / user.story_point_capability
            })
        rescue => e
          puts e
        end
      end
      user_availability.sort_by{|obj| obj[:availability]}.first[:user_id]
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.permit(:id,:description, :story_point ,:status,:user_id)
    end
end
