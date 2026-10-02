FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

COPY --from=build /app/publish .

RUN mkdir -p /app/Database

COPY Database/SW.db /app/Database/SW.db

RUN chmod -R 777 /app/Database

ENTRYPOINT ["dotnet", "Backend.dll"]